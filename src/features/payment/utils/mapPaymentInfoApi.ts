import type { PaymentLinkInfo } from '../../../shared/types/payment.types'
import type {
  CustomerAddressLines,
  CustomerSummary,
  PaymentDetailRow,
  PaymentItem,
} from '../../../shared/types/paymentInfoApi.types'

export function buildAddressLines(
  customerData: Record<string, string>,
): CustomerAddressLines {
  return {
    line1: customerData['Home.Address.AddrLine1']?.trim() ?? '',
    line2: customerData['Home.Address.AddrLine2']?.trim() ?? '',
    line3: customerData['Home.Address.AddrLine3']?.trim() ?? '',
    postcode: customerData['Home.Address.AddrPostCode']?.trim() ?? '',
  }
}

function buildRiskAddress(customerData: Record<string, string>): string {
  const lines = buildAddressLines(customerData)
  const parts = [lines.line1, lines.line2, lines.line3, lines.postcode].filter(
    Boolean,
  )

  return parts.join(', ') || '—'
}

export function formatDueDate(effDate: string): string {
  const raw = effDate.trim().slice(0, 10)
  if (!raw) {
    return '—'
  }

  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    return raw
  }

  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getCustomerEmail(customerData: Record<string, string>): string {
  return (
    customerData['Email']?.trim() ??
    customerData['Proposer.Person.Email']?.trim() ??
    customerData['EmailAddress']?.trim() ??
    ''
  )
}

export function mapCustomerSummary(
  customerData: Record<string, string>,
  fallbackReference: string,
): CustomerSummary {
  const directName = customerData['ClientName']?.trim() || customerData['ProposerName']?.trim()
  const title = customerData['Proposer.Person.Title'] ?? ''
  const forenames = customerData['Proposer.Person.Forenames'] ?? ''
  const surname = customerData['Proposer.Person.Surname'] ?? ''
  const fallbackName = [title, forenames, surname].filter(Boolean).join(' ').trim()

  return {
    name: directName || fallbackName || '—',
    reference: customerData['ClientReference'] ?? fallbackReference,
    address: buildRiskAddress(customerData),
    policyNumber: customerData['PolicyNumber'] ?? '—',
    phone:
      customerData['Proposer.Person.PhoneNumber'] ??
      customerData['Proposer.Person.Mobile'] ??
      customerData['PhoneNumber'] ??
      '',
    email: getCustomerEmail(customerData),
    addressLines: buildAddressLines(customerData),
  }
}

export function mapPaymentLinkInfo(
  customerData: Record<string, string>,
  paymentDetails: PaymentDetailRow[],
  fallbackReference: string,
  validatedPostcode: string,
): PaymentLinkInfo {
  const summary = mapCustomerSummary(customerData, fallbackReference)
  const totalAmount = paymentDetails.reduce(
    (sum, row) => sum + (Number(row.Total) || 0),
    0,
  )
  const paymentDescription =
    paymentDetails
      .map((row) => row.Payment_Description?.trim())
      .filter(Boolean)
      .join('; ') || 'Payment'

  return {
    clientReference: summary.reference,
    clientName: summary.name === '—' ? '' : summary.name,
    clientEmail: summary.email ?? '',
    riskAddress: summary.address === '—' ? '' : summary.address,
    policyNumber: summary.policyNumber === '—' ? '' : summary.policyNumber,
    totalAmount,
    paymentDescription,
    expectedPostcode:
      summary.addressLines.postcode || validatedPostcode.trim().toUpperCase(),
    currency: 'GBP',
  }
}

export function mapPaymentItems(
  customerData: Record<string, string>,
  paymentDetails: PaymentDetailRow[],
): PaymentItem[] {
  const riskAddress = buildRiskAddress(customerData)
  const policyNumber = customerData['PolicyNumber'] ?? '—'
  const reference = customerData['ClientReference'] ?? '—'

  return paymentDetails.map((row, index) => {
    const requestId = row.RequestID?.trim() ?? ''
    // Always unique per row — API may return duplicate/empty RequestID values.
    const id = requestId ? `${requestId}__${index}` : `payment-${index}`

    return {
      id,
      description: row.Payment_Description?.trim() || '—',
      policyNumber,
      reference,
      dueDate: formatDueDate(row.Eff_Date ?? ''),
      riskAddress,
      amount: Number(row.Total) || 0,
      requestId,
    }
  })
}
