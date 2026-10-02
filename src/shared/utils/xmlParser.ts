import type { PaymentLinkInfo } from '../types/payment.types'
import { formatProposerNames } from './formatters'

function getTagValue(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const match = xml.match(regex)
  return match?.[1]?.trim() ?? ''
}

export function parsePaymentLinkInfo(xml: string): PaymentLinkInfo {
  const proposers: string[] = []
  const proposerRegex = /<ProposerDetails>([\s\S]*?)<\/ProposerDetails>/gi
  let pMatch = proposerRegex.exec(xml)

  while (pMatch !== null) {
    const block = pMatch[1]
    const getBlockVal = (tag: string) => {
      const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'))
      return m?.[1]?.trim() ?? ''
    }
    const title = getBlockVal('Proposer\\.Person\\.Title')
    const forenames = getBlockVal('Proposer\\.Person\\.Forenames')
    const surname = getBlockVal('Proposer\\.Person\\.Surname')
    const name = [title, forenames, surname].filter(Boolean).join(' ')
    if (name) {
      proposers.push(name)
    }
    pMatch = proposerRegex.exec(xml)
  }

  let clientName = formatProposerNames(proposers)
  if (!clientName) {
    const title = getTagValue(xml, 'Proposer.Person.Title')
    const forenames = getTagValue(xml, 'Proposer.Person.Forenames')
    const surname = getTagValue(xml, 'Proposer.Person.Surname')
    clientName = [title, forenames, surname].filter(Boolean).join(' ')
  }

  const addr1 = getTagValue(xml, 'Home.Address.AddrLine1')
  const addr2 = getTagValue(xml, 'Home.Address.AddrLine2')
  const addr3 = getTagValue(xml, 'Home.Address.AddrLine3')
  const postcode = getTagValue(xml, 'Home.Address.AddrPostCode')
  const total = Number.parseFloat(getTagValue(xml, 'Total'))

  const addressParts = [addr1, addr2, addr3, postcode].filter(Boolean)

  const clientEmail =
    getTagValue(xml, 'Email') ||
    getTagValue(xml, 'Proposer.Person.Email') ||
    getTagValue(xml, 'EmailAddress')

  return {
    clientReference: getTagValue(xml, 'ClientReference'),
    clientName,
    clientEmail,
    riskAddress: addressParts.join(', '),
    policyNumber: getTagValue(xml, 'PolicyNumber'),
    totalAmount: Number.isFinite(total) ? total : 0,
    paymentDescription: getTagValue(xml, 'Payment_Description'),
    expectedPostcode: postcode,
    currency: 'GBP',
  }
}
