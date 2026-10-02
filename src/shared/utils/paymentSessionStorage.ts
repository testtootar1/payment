import { SESSION_KEYS } from '../constants/paymentGateway'
import type { HppResponse, PaymentSession } from '../types/payment.types'

/** Absolute session lifetime after successful postcode confirmation. */
export const PAYMENT_SESSION_TIMEOUT_MS = 15 * 60 * 1000

export function clearPaymentSession(): void {
  sessionStorage.removeItem(SESSION_KEYS.paymentSession)
  sessionStorage.removeItem(SESSION_KEYS.lastHppResponse)
  sessionStorage.removeItem(SESSION_KEYS.retryOpenPaymentForm)
}

export function savePaymentSession(session: PaymentSession): void {
  const expiresAt =
    typeof session.expiresAt === 'number' && session.expiresAt > Date.now()
      ? session.expiresAt
      : Date.now() + PAYMENT_SESSION_TIMEOUT_MS

  const payload: PaymentSession = {
    ...session,
    expiresAt,
  }

  sessionStorage.setItem(SESSION_KEYS.paymentSession, JSON.stringify(payload))
}

export function loadPaymentSession(): PaymentSession | null {
  const raw = sessionStorage.getItem(SESSION_KEYS.paymentSession)
  if (!raw) {
    return null
  }

  try {
    const session = JSON.parse(raw) as PaymentSession

    if (
      typeof session.expiresAt !== 'number' ||
      Date.now() > session.expiresAt
    ) {
      clearPaymentSession()
      return null
    }

    return session
  } catch {
    clearPaymentSession()
    return null
  }
}

export function saveHppResponse(response: HppResponse): void {
  sessionStorage.setItem(SESSION_KEYS.lastHppResponse, JSON.stringify(response))
}

export function loadHppResponse(): HppResponse | null {
  const raw = sessionStorage.getItem(SESSION_KEYS.lastHppResponse)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as HppResponse
  } catch {
    return null
  }
}

export function clearHppResponse(): void {
  sessionStorage.removeItem(SESSION_KEYS.lastHppResponse)
}

export function setRetryPaymentIntent(): void {
  sessionStorage.setItem(SESSION_KEYS.retryOpenPaymentForm, '1')
}

export function consumeRetryPaymentIntent(): boolean {
  const shouldRetry =
    sessionStorage.getItem(SESSION_KEYS.retryOpenPaymentForm) === '1'
  if (shouldRetry) {
    sessionStorage.removeItem(SESSION_KEYS.retryOpenPaymentForm)
  }
  return shouldRetry
}

export function hasNotificationEmailBeenSent(
  type: 'success' | 'failure',
  reference: string,
): boolean {
  const key =
    type === 'success'
      ? SESSION_KEYS.successEmailSentFor
      : SESSION_KEYS.failureEmailSentFor
  return sessionStorage.getItem(key) === reference
}

export function markNotificationEmailAsSent(
  type: 'success' | 'failure',
  reference: string,
): void {
  const key =
    type === 'success'
      ? SESSION_KEYS.successEmailSentFor
      : SESSION_KEYS.failureEmailSentFor
  sessionStorage.setItem(key, reference)
}
