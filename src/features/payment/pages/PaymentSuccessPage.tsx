import { useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LegacyPageShell } from '../../../shared/layout/LegacyPageShell'
// import { LEGACY_LINKS } from '../../../shared/constants/legacyAssets'
import { formatCurrency } from '../../../shared/utils/formatters'
import {
  hasNotificationEmailBeenSent,
  loadHppResponse,
  loadPaymentSession,
  markNotificationEmailAsSent,
} from '../../../shared/utils/paymentSessionStorage'
import { sendPaymentSuccessEmail } from '../../notification/services/emailService'

export function PaymentSuccessPage() {
  const navigate = useNavigate()
  const session = loadPaymentSession()
  const response = loadHppResponse()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!session) {
      navigate('/', { replace: true })
      return
    }

    if (!response) {
      return
    }

    const emailKey = response.ORDER_ID ?? session.paymentInfo.clientReference
    if (hasNotificationEmailBeenSent('success', emailKey)) {
      return
    }

    markNotificationEmailAsSent('success', emailKey)
    void sendPaymentSuccessEmail(session.paymentInfo, response).catch((error) => {
      console.error('Failed to send success email notifications', error)
    })
  }, [navigate, response, session])

  if (!session) {
    return null
  }

  const amountPaid = formatCurrency(
    session.paymentInfo.totalAmount,
    session.paymentInfo.currency,
  )

  return (
    <LegacyPageShell>
      <div className="thankyou-page">
        <div className="thankyou-main">
          <h1>
            Thank you for choosing Thamesbank <br />
            for your insurance.
          </h1>
               
        

          <div className="thank-you-container">
            <div className="thank-you-card">
              <div className="success-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="thank-you-title">Payment Successful</h2>
              <p className="thank-you-message">
                Thank you! Your transaction has been completed successfully.
              </p>

              <div className="details-card">
                <div className="details-header">
                  <h5 className="details-title">Transaction Receipt</h5>
                  <span className="badge bg-success text-white receipt-status-badge">
                    SUCCESS
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Client Name</span>
                  <span className="detail-value">
                    {session.paymentInfo.clientName}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Policy Number</span>
                  <span className="detail-value">
                    {session.paymentInfo.policyNumber}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Client Reference</span>
                  <span className="detail-value">
                    {session.paymentInfo.clientReference}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Address</span>
                  <span className="detail-value">
                    {session.paymentInfo.riskAddress}
                  </span>
                </div>

                {response?.ORDER_ID && (
                  <div className="detail-row">
                    <span className="detail-label">Order ID</span>
                    <span className="detail-value">{response.ORDER_ID}</span>
                  </div>
                )}

                {response?.AUTHCODE && (
                  <div className="detail-row">
                    <span className="detail-label">Auth Code</span>
                    <span className="detail-value">{response.AUTHCODE}</span>
                  </div>
                )}

                {response?.PASREF && (
                  <div className="detail-row">
                    <span className="detail-label">Payment Ref</span>
                    <span className="detail-value">{response.PASREF}</span>
                  </div>
                )}

                <div className="total-row">
                  <span className="total-label">Amount Paid</span>
                  <span className="total-value">{amountPaid}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LegacyPageShell>
  )
}
