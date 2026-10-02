import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LegacyPageShell } from '../../../shared/layout/LegacyPageShell'
import {
  clearHppResponse,
  hasNotificationEmailBeenSent,
  loadHppResponse,
  loadPaymentSession,
  markNotificationEmailAsSent,
  setRetryPaymentIntent,
} from '../../../shared/utils/paymentSessionStorage'
import { sendPaymentFailureEmail } from '../../notification/services/emailService'

export function PaymentFailedPage() {
  const navigate = useNavigate()
  const session = loadPaymentSession()
  const response = loadHppResponse()

  useEffect(() => {
    if (!session) {
      navigate('/', { replace: true })
      return
    }

    const emailKey =
      response?.ORDER_ID ?? response?.PASREF ?? session.paymentInfo.clientReference
    if (hasNotificationEmailBeenSent('failure', emailKey)) {
      return
    }

    markNotificationEmailAsSent('failure', emailKey)
    void sendPaymentFailureEmail(session.paymentInfo, response ?? {}).catch((error) => {
      console.error('Failed to send failure email notifications', error)
    })
  }, [navigate, response, session])

  if (!session) {
    return null
  }

  const failureMessage =
    response?.MESSAGE ?? 'Your payment could not be completed. Please try again.'

  const handleRetry = () => {
    clearHppResponse()
    setRetryPaymentIntent()
    navigate(`/${session.referenceNumber}/summary`)
  }

  return (
    <LegacyPageShell>
      <div className="thankyou-page failed-page">
        <div className="thankyou-main">
          <h1>Payment UnSuccessful</h1>
          <p>We are sorry but your payment has failed to process.</p>
          <p>{failureMessage}</p>
          <p>
            Please contact our customer service department on{' '}
            <b>0344 274 0165</b>, quoting reference{' '}
            <b>{session.referenceNumber}</b> to complete your payment.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    </LegacyPageShell>
  )
}
