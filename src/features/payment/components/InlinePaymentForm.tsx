import { useLayoutEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { REAXP_PAYMENT_IFRAME_ID } from '../../../shared/constants/paymentGateway'

interface InlinePaymentFormProps {
  isLoading: boolean
  gatewayReady: boolean
  onActivate: () => void
  onIframeLoad: () => void
  variant?: 'default' | 'sidebar' | 'address-box'
}

export function InlinePaymentForm({
  isLoading,
  gatewayReady,
  onActivate,
  onIframeLoad,
  variant = 'default',
}: InlinePaymentFormProps) {
  useLayoutEffect(() => {
    if (gatewayReady) {
      onActivate()
    }
  }, [gatewayReady, onActivate])

  return (
    <section
      className={`payment-inline-form${variant === 'sidebar' ? ' payment-inline-form--sidebar' : ''}${variant === 'address-box' ? ' payment-inline-form--address-box' : ''}${isLoading ? ' payment-inline-form--loading' : ''}`}
      aria-label="Secure payment"
      aria-busy={isLoading}
    >
      {isLoading ? (
        <div
          className="payment-inline-form__loader"
          role="status"
          aria-live="polite"
        >
          <Spinner animation="border" variant="primary" />
          <span>Loading secure payment form…</span>
        </div>
      ) : null}
      <iframe
        id={REAXP_PAYMENT_IFRAME_ID}
        title="Secure card payment"
        className="payment-inline-form__iframe"
        onLoad={onIframeLoad}
      />
    </section>
  )
}
