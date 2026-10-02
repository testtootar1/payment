export interface PaymentDetailRow {
  RequestID: string
  Total: number
  Eff_Date: string
  Payment_Description: string
}

export interface PaymentInfoApiMeta {
  ref: string
  pcode: string
  payment_total: number
  buildings_excess: number
  status: string
}

export interface PaymentInfoApiResponse {
  success: boolean
  error: string
  customer_data: Record<string, string>
  payment_details: PaymentDetailRow[]
  meta?: PaymentInfoApiMeta
}

export interface PaymentItem {
  id: string
  description: string
  policyNumber: string
  reference: string
  dueDate: string
  riskAddress: string
  amount: number
  requestId: string
}

export interface CustomerAddressLines {
  line1: string
  line2: string
  line3: string
  postcode: string
}

export interface CustomerSummary {
  name: string
  reference: string
  address: string
  policyNumber: string
  phone?: string
  email?: string
  addressLines: CustomerAddressLines
}
