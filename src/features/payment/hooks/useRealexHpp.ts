import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PAYMENT_GATEWAY_CONFIG,
  REAXP_PAYMENT_IFRAME_ID,
  ROUTES,
} from '../../../shared/constants/paymentGateway'
import { toMinorUnits } from '../../../shared/utils/formatters'
import {
  saveHppResponse,
  loadPaymentSession,
} from '../../../shared/utils/paymentSessionStorage'
import type { RealexHppResponse } from '../types/realex'
import { fetchHppRequestPayload } from '../services/hppRequestApi'
import { billingAddressFromRisk } from '../utils/billingAddressFromRisk'

function loadRealexScript(): Promise<void> {
  if (window.RealexHpp) {
    return Promise.resolve()
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${PAYMENT_GATEWAY_CONFIG.RXP_SCRIPT_PATH}"]`,
  )

  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.RealexHpp) {
        resolve()
        return
      }
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () =>
        reject(new Error('Failed to load Realex HPP library.')),
      )
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = PAYMENT_GATEWAY_CONFIG.RXP_SCRIPT_PATH
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Realex HPP library.'))
    document.body.appendChild(script)
  })
}

function isPaymentSuccessful(response: RealexHppResponse): boolean {
  return Boolean(response.AUTHCODE) || response.RESULT === '00'
}

export function useRealexHpp(enabled: boolean, formSessionKey = 0) {
  const navigate = useNavigate()
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const payloadRef = useRef<Record<string, string> | null>(null)
  const embeddedInitializedRef = useRef(false)

  const handlePaymentResponse = useCallback(
    (answer: RealexHppResponse, close: () => void) => {
      close()
      saveHppResponse(answer)

      if (isPaymentSuccessful(answer)) {
        navigate(ROUTES.paymentSuccess)
        return
      }

      navigate(ROUTES.paymentFailed)
    },
    [navigate],
  )

  useEffect(() => {
    if (!enabled) {
      return
    }

    let cancelled = false
    embeddedInitializedRef.current = false
    payloadRef.current = null
    setIsReady(false)
    setIsFormLoading(false)

    async function prepareGateway() {
      const session = loadPaymentSession()
      if (!session) {
        return
      }

      try {
        await loadRealexScript()

        if (cancelled) {
          return
        }

        const realex = window.RealexHpp
        if (!realex) {
          throw new Error('Realex HPP library is unavailable.')
        }

        realex.setHppUrl(PAYMENT_GATEWAY_CONFIG.SERVICE_URL)

        const orderId = `${session.referenceNumber}-${Date.now()}`
        const billing = billingAddressFromRisk(
          session.paymentInfo.riskAddress,
          session.validatedPostcode,
        )
        const payload = await fetchHppRequestPayload({
          amountMinor: toMinorUnits(session.paymentInfo.totalAmount),
          orderId,
          street1: billing.street1,
          street2: billing.street2,
          city: billing.city,
          postcode: session.validatedPostcode,
          comment: session.paymentInfo.paymentDescription,
        })

        if (cancelled) {
          return
        }

        payloadRef.current = payload
        setIsReady(true)
        setError(null)
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Unable to prepare payment.'
          setError(message)
          setIsReady(false)
        }
      }
    }

    void prepareGateway()

    return () => {
      cancelled = true
    }
  }, [enabled, formSessionKey])

  const activateEmbeddedForm = useCallback(() => {
    if (!isReady || !payloadRef.current || embeddedInitializedRef.current) {
      return
    }

    const realex = window.RealexHpp
    if (!realex?.embedded) {
      setError('Embedded payment is unavailable.')
      setIsFormLoading(false)
      return
    }

    const iframe = document.getElementById(REAXP_PAYMENT_IFRAME_ID)
    if (!iframe) {
      return
    }

    embeddedInitializedRef.current = true
    setIsFormLoading(true)

    const clearLoadingTimer = window.setTimeout(() => {
      setIsFormLoading(false)
    }, 12000)

    try {
      realex.embedded.init(
        'autoload',
        REAXP_PAYMENT_IFRAME_ID,
        handlePaymentResponse,
        payloadRef.current,
        {
          onResize: () => {
            window.clearTimeout(clearLoadingTimer)
            setIsFormLoading(false)
          },
        },
      )
    } catch (err) {
      window.clearTimeout(clearLoadingTimer)
      embeddedInitializedRef.current = false
      const message =
        err instanceof Error ? err.message : 'Unable to open payment form.'
      setError(message)
      setIsFormLoading(false)
    }
  }, [handlePaymentResponse, isReady])

  const onIframeLoad = useCallback(() => {
    setIsFormLoading(false)
  }, [])

  return {
    isReady,
    error,
    isFormLoading,
    activateEmbeddedForm,
    onIframeLoad,
  }
}
