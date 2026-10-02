import mockXml from './mockPaymentLinkInfo.xml?raw'
import { parsePaymentLinkInfo } from '../utils/xmlParser'
import type { PaymentLinkInfo } from '../types/payment.types'

const parsedMock = parsePaymentLinkInfo(mockXml)

export function fetchPaymentLinkInfo(
  referenceNumber: string,
): PaymentLinkInfo | null {
  if (
    parsedMock.clientReference.toUpperCase() !==
    referenceNumber.toUpperCase()
  ) {
    return null
  }

  return { ...parsedMock, clientReference: referenceNumber.toUpperCase() }
}

export function getMockPaymentXml(): string {
  return mockXml
}
