import { createHash, randomBytes } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Connect } from 'vite'

export const PAYMENT_GATEWAY = {
  MERCHANT_ID: process.env.REALEX_MERCHANT_ID ?? 'THAM016',
  SECRET: process.env.REALEX_SECRET ?? '1UDOZ2kf9B',
  ACCOUNT: process.env.REALEX_ACCOUNT ?? 'elements02',
  SERVICE_URL:
    process.env.REALEX_SERVICE_URL ?? 'https://pay.realexpayments.com/pay',
  CURRENCY: 'GBP',
} as const

function generateSha1Hash(
  timestamp: string,
  merchantId: string,
  orderId: string,
  amount: string,
  currency: string,
  secret: string,
): string {
  const toHash = [timestamp, merchantId, orderId, amount, currency].join('.')
  const hash1 = createHash('sha1').update(toHash).digest('hex')
  return createHash('sha1').update(`${hash1}.${secret}`).digest('hex')
}

function createTimestamp(): string {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
    `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
  )
}

export function buildHppRequestPayload(options: {
  amountMinor: number
  orderId?: string
  customerEmail?: string
  billingStreet1?: string
  billingStreet2?: string
  billingCity?: string
  billingPostcode?: string
  comment?: string
}) {
  const orderId =
    options.orderId ?? randomBytes(11).toString('hex').slice(0, 22)
  const timestamp = createTimestamp()
  const amount = String(options.amountMinor)
  const { MERCHANT_ID, SECRET, ACCOUNT, CURRENCY } = PAYMENT_GATEWAY

  const payload: Record<string, string> = {
    MERCHANT_ID,
    ACCOUNT,
    ORDER_ID: orderId,
    AMOUNT: amount,
    CURRENCY,
    TIMESTAMP: timestamp,
    AUTO_SETTLE_FLAG: '1',
    HPP_VERSION: '2',
    HPP_CHANNEL: 'ECOM',
    HPP_LANG: 'en',
    HPP_CUSTOMER_EMAIL: options.customerEmail ?? 'customer@thamesbank.example',
    HPP_BILLING_STREET1: options.billingStreet1 ?? 'Address',
    HPP_BILLING_CITY: options.billingCity ?? 'Unknown',
    HPP_BILLING_POSTALCODE: options.billingPostcode ?? 'CM3 5FZ',
    HPP_BILLING_COUNTRY: '826',
    COMMENT1: options.comment ?? 'Thames Bank Insurance Portal',
  }

  if (options.billingStreet2?.trim()) {
    payload.HPP_BILLING_STREET2 = options.billingStreet2.trim()
  }

  payload.SHA1HASH = generateSha1Hash(
    timestamp,
    MERCHANT_ID,
    orderId,
    amount,
    CURRENCY,
    SECRET,
  )

  return payload
}

export function handleHppRequest(
  req: IncomingMessage,
  res: ServerResponse,
): void {
  const host = req.headers.host ?? 'localhost'
  const url = new URL(req.url ?? '/', `http://${host}`)
  const amountMinor = Number(url.searchParams.get('amount') ?? '25660')
  const orderId = url.searchParams.get('orderId') ?? undefined
  const customerEmail = url.searchParams.get('email') ?? undefined
  const billingStreet1 = url.searchParams.get('street1') ?? undefined
  const billingStreet2 = url.searchParams.get('street2') ?? undefined
  const billingCity = url.searchParams.get('city') ?? undefined
  const billingPostcode = url.searchParams.get('postcode') ?? undefined
  const comment = url.searchParams.get('comment') ?? undefined

  const payload = buildHppRequestPayload({
    amountMinor: Number.isFinite(amountMinor) ? amountMinor : 25660,
    orderId: orderId ?? undefined,
    customerEmail: customerEmail ?? undefined,
    billingStreet1: billingStreet1 ?? undefined,
    billingStreet2: billingStreet2 ?? undefined,
    billingCity: billingCity ?? undefined,
    billingPostcode: billingPostcode ?? undefined,
    comment: comment ?? undefined,
  })

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.statusCode = 200
  res.end(JSON.stringify(payload))
}

export function hppRequestMiddleware(): Connect.NextHandleFunction {
  return (req, res, next) => {
    if (!req.url?.startsWith('/api/hpp-request')) {
      next()
      return
    }
    handleHppRequest(req, res)
  }
}
