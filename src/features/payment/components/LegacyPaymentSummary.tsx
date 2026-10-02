import Table from 'react-bootstrap/Table'
import { formatCurrency } from '../../../shared/utils/formatters'
import type { PaymentLinkInfo } from '../../../shared/types/payment.types'

interface LegacyPaymentSummaryProps {
  paymentInfo: PaymentLinkInfo
}

export function LegacyPaymentSummary({ paymentInfo }: LegacyPaymentSummaryProps) {
  const totalFormatted = formatCurrency(
    paymentInfo.totalAmount,
    paymentInfo.currency,
  )

  return (
    <div className="price-summary price-full-page mb-0">
      <h1 className="mb-3 mt-0">Price Summary</h1>
      <p className="summary-detail-text">
        <span>
          Please review your policy details below before proceeding to secure
          payment. The total premium payable is {totalFormatted} (inclusive of
          Insurance Premium Tax where applicable).
        </span>
      </p>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Client Reference</td>
            <td>{paymentInfo.clientReference}</td>
          </tr>
          <tr>
            <td>Policy Number</td>
            <td>{paymentInfo.policyNumber}</td>
          </tr>
          <tr>
            <td>Proposer</td>
            <td>{paymentInfo.clientName}</td>
          </tr>
          <tr>
            <td>Risk Address</td>
            <td>{paymentInfo.riskAddress}</td>
          </tr>
          <tr>
            <td>Payment Description</td>
            <td>{paymentInfo.paymentDescription}</td>
          </tr>
          <tr>
            <td>
              <strong>Total Amount Payable</strong>
            </td>
            <td>
              <strong>{totalFormatted}</strong>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
