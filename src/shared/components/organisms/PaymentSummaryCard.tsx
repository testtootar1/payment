import Typography from '@mui/material/Typography'
import { formatCurrency } from '../../utils/formatters'
import type { PaymentLinkInfo } from '../../types/payment.types'
import { SummaryRow } from '../molecules/SummaryRow'
import { SummaryCardRoot, TotalAmountBox } from './PaymentSummaryCard.styles'

interface PaymentSummaryCardProps {
  paymentInfo: PaymentLinkInfo
}

export function PaymentSummaryCard({ paymentInfo }: PaymentSummaryCardProps) {
  return (
    <SummaryCardRoot>
      <Typography variant="h5" gutterBottom>
        Payment Summary
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Please review your policy details before proceeding to payment.
      </Typography>

      <SummaryRow label="Client Name" value={paymentInfo.clientName} />
      <SummaryRow label="Risk Address" value={paymentInfo.riskAddress} />
      <SummaryRow label="Policy Number" value={paymentInfo.policyNumber} />
      <SummaryRow
        label="Payment Description"
        value={paymentInfo.paymentDescription}
      />

      <TotalAmountBox>
        <Typography variant="subtitle1">Total Amount</Typography>
        <Typography variant="h5" color="primary.dark">
          {formatCurrency(paymentInfo.totalAmount, paymentInfo.currency)}
        </Typography>
      </TotalAmountBox>
    </SummaryCardRoot>
  )
}
