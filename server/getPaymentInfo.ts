import { formatProposerNames } from '../src/shared/utils/formatters'
import type {
  PaymentDetailRow,
  PaymentInfoApiResponse,
} from '../src/shared/types/paymentInfoApi.types'

const INFO_SERVICE_URL =
  process.env.INFO_SERVICE_URL ??
  'http://extranet.paragon-uk.net:10242/InfoService/InfoService'

const SKIP_KEYS = new Set(['Datasource', 'Execute', 'ColumnCount', 'RowCount'])
const PAYMENT_KEYS = new Set([
  'RequestID',
  'Total',
  'Eff_Date',
  'Payment_Description',
])

function escapeSqlString(value: string): string {
  return value.replace(/'/g, "''")
}

function fieldValue(
  key: string,
  data: Record<string, string>,
  fallback = '',
): string {
  const val = data[key]?.trim() ?? ''
  return val !== '' ? val : fallback
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
}

function buildInputXml(ref: string, pcode: string): string {
  return `
<Query>
    <Datasource>InfoService3</Datasource>
    <Execute>
        EXEC ThamesbankAuto.[dbo].[pr_GetPaymentLinkInfoXML]
        @Ref = N'${escapeSqlString(ref)}',
        @PCode = N'${escapeSqlString(pcode)}'
    </Execute>
</Query>
`
}

function buildSoapBody(ref: string, pcode: string): string {
  const inputXML = buildInputXml(ref, pcode)
  return `<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:open="www.opengi.co.uk">
    <soapenv:Header/>
    <soapenv:Body>
        <open:ExecuteQuery>
            <inputXML><![CDATA[${inputXML}]]></inputXML>
        </open:ExecuteQuery>
    </soapenv:Body>
</soapenv:Envelope>`
}

function parseSoapResponse(response: string): {
  data: Record<string, string>
  paymentDetails: PaymentDetailRow[]
  error: string
} {
  const data: Record<string, string> = {}
  const currentPaymentKeys: Record<string, string[]> = {}
  const paymentDetails: PaymentDetailRow[] = []

  let decoded = decodeHtmlEntities(response)
  decoded = decodeHtmlEntities(decoded)

  const proposers: string[] = []
  const proposerBlockRegex = /<ProposerDetails>([\s\S]*?)<\/ProposerDetails>/gi
  let pMatch = proposerBlockRegex.exec(decoded)

  while (pMatch !== null) {
    const block = pMatch[1]
    const getBlockVal = (tag: string) => {
      const m = block.match(new RegExp(`<${tag}>([^<]+)<\\/${tag}>`, 'i'))
      return m?.[1]?.trim() ?? ''
    }
    const title = getBlockVal('Proposer\\.Person\\.Title')
    const forenames = getBlockVal('Proposer\\.Person\\.Forenames')
    const surname = getBlockVal('Proposer\\.Person\\.Surname')
    const fullName = [title, forenames, surname].filter(Boolean).join(' ')
    if (fullName) {
      proposers.push(fullName)
    }
    pMatch = proposerBlockRegex.exec(decoded)
  }

  const tagRegex = /<([a-zA-Z0-9_.]+)>([^<]+)<\/\1>/g
  let match = tagRegex.exec(decoded)

  while (match !== null) {
    const key = match[1]
    const val = match[2].trim()

    if (!SKIP_KEYS.has(key)) {
      if (PAYMENT_KEYS.has(key)) {
        if (!currentPaymentKeys[key]) {
          currentPaymentKeys[key] = []
        }
        currentPaymentKeys[key].push(val)
      } else {
        if (!data[key]) {
          data[key] = val
        }
      }
    }

    match = tagRegex.exec(decoded)
  }

  const combinedProposers = formatProposerNames(proposers)
  if (combinedProposers) {
    data['ClientName'] = combinedProposers
    data['ProposerName'] = combinedProposers
  }

  const totals = currentPaymentKeys.Total ?? []
  if (totals.length > 0) {
    for (let i = 0; i < totals.length; i++) {
      paymentDetails.push({
        RequestID: currentPaymentKeys.RequestID?.[i] ?? '',
        Total: Number.parseFloat(currentPaymentKeys.Total?.[i] ?? '0') || 0,
        Eff_Date: currentPaymentKeys.Eff_Date?.[i] ?? '',
        Payment_Description: currentPaymentKeys.Payment_Description?.[i] ?? '',
      })
    }
  }

  if (Object.keys(data).length === 0 && paymentDetails.length === 0) {
    return {
      data,
      paymentDetails,
      error: 'Failed to extract data parameters from response.',
    }
  }

  const resStatus = fieldValue('Res', data)
  if (resStatus && !/success/i.test(resStatus)) {
    return {
      data,
      paymentDetails,
      error:
        resStatus.toLowerCase() === 'login failed'
          ? 'We could not match this policy reference and postcode. Please check and try again.'
          : resStatus,
    }
  }

  return { data, paymentDetails, error: '' }
}

export async function getPaymentInfo(
  ref: string,
  pcode: string,
): Promise<PaymentInfoApiResponse> {
  const trimmedRef = ref.trim()
  const trimmedPcode = pcode.trim()

  if (!trimmedRef || !trimmedPcode) {
    return {
      success: false,
      error: 'Missing required query parameters: ref and pcode.',
      customer_data: {},
      payment_details: [],
    }
  }

  const soapBody = buildSoapBody(trimmedRef, trimmedPcode)

  try {
    const response = await fetch(INFO_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: '"www.opengi.co.uk/ExecuteQuery"',
        'Content-Length': String(Buffer.byteLength(soapBody)),
      },
      body: soapBody,
    })

    const responseText = await response.text()

    if (!responseText) {
      return {
        success: false,
        error: 'No response received from server.',
        customer_data: {},
        payment_details: [],
        meta: {
          ref: trimmedRef,
          pcode: trimmedPcode,
          payment_total: 0,
          buildings_excess: 0,
          status: 'ERROR',
        },
      }
    }

    const parsed = parseSoapResponse(responseText)
    const error = parsed.error
    const paymentTotal = parsed.paymentDetails.reduce(
      (sum, row) => sum + (row.Total ?? 0),
      0,
    )
    const bExcess =
      (Number.parseFloat(parsed.data['Home.Buildings.BVExcess'] ?? '0') || 0) +
      (Number.parseFloat(parsed.data['Home.Buildings.BCExcess'] ?? '0') || 0)

    return {
      success: !error,
      error,
      customer_data: parsed.data,
      payment_details: parsed.paymentDetails,
      meta: {
        ref: trimmedRef,
        pcode: trimmedPcode,
        payment_total: paymentTotal,
        buildings_excess: bExcess,
        status: error ? 'ERROR' : fieldValue('Res', parsed.data, 'OK'),
      },
    }
  } catch (err) {
    const error =
      err instanceof Error ? `Request Error: ${err.message}` : 'Request failed.'
    return {
      success: false,
      error,
      customer_data: {},
      payment_details: [],
      meta: {
        ref: trimmedRef,
        pcode: trimmedPcode,
        payment_total: 0,
        buildings_excess: 0,
        status: 'ERROR',
      },
    }
  }
}
