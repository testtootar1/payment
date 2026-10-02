import Alert from '@mui/material/Alert'
import { forwardRef, type ReactNode } from 'react'
import {
  PaymentDetailsAlert,
  PaymentDetailsBody,
  PaymentDetailsCard,
  PaymentDetailsHeader,
} from '../styles/PaymentSummaryPage.styles'

interface PaymentDetailsBoxProps {
  paymentForm: ReactNode
  paymentError?: string | null
}

export const PaymentDetailsBox = forwardRef<
  HTMLDivElement,
  PaymentDetailsBoxProps
>(function PaymentDetailsBox({ paymentForm, paymentError = null }, ref) {
  return (
    <PaymentDetailsCard ref={ref} elevation={0}>
      <PaymentDetailsHeader>Payment Details</PaymentDetailsHeader>
      <PaymentDetailsBody>
        {paymentError ? (
          <PaymentDetailsAlert>
            <Alert severity="error">{paymentError}</Alert>
          </PaymentDetailsAlert>
        ) : null}
        {paymentForm}
      </PaymentDetailsBody>
    </PaymentDetailsCard>
  )
})
