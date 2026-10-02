export interface PaymentLinkInfo {
  clientReference: string
  clientName: string
  clientEmail: string
  riskAddress: string
  policyNumber: string
  totalAmount: number
  paymentDescription: string
  expectedPostcode: string
  currency: string
}

export interface HppResponse {
  RESULT?: string
  MESSAGE?: string
  ORDER_ID?: string
  AUTHCODE?: string
  PASREF?: string
  AMOUNT?: string
  TIMESTAMP?: string
  MERCHANT_ID?: string
}

export interface PaymentSession {
  paymentInfo: PaymentLinkInfo
  referenceNumber: string
  validatedPostcode: string
  /** Unix ms — auto logout after this time (15 minutes from login). */
  expiresAt: number
}
