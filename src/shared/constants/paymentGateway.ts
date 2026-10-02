export const REAXP_PAYMENT_IFRAME_ID = 'realex-payment-iframe'

export const PAYMENT_GATEWAY_CONFIG = {
  MERCHANT_ID: 'THAM016',
  ACCOUNT: 'elements02',
  SERVICE_URL: 'https://pay.realexpayments.com/pay',
  RXP_SCRIPT_PATH: '/rxp-hpp.js',
} as const

export const ROUTES = {
  paymentSuccess: '/payment-success',
  paymentFailed: '/payment-failed',
} as const

export const SESSION_KEYS = {
  paymentSession: 'thamesBank.paymentSession',
  lastHppResponse: 'thamesBank.lastHppResponse',
  retryOpenPaymentForm: 'thamesBank.retryOpenPaymentForm',
  successEmailSentFor: 'thamesBank.successEmailSentFor',
  failureEmailSentFor: 'thamesBank.failureEmailSentFor',
} as const
