import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Connect } from 'vite'
import { getPaymentInfo } from './getPaymentInfo'

const PAYMENT_INFO_PATHS = new Set([
  '/get-payment-info.php',
  '/api/payment-info',
])

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export async function handlePaymentInfoRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const host = req.headers.host ?? 'localhost'
  const url = new URL(req.url ?? '/', `http://${host}`)
  const ref = url.searchParams.get('ref')?.trim() ?? ''
  const pcode = url.searchParams.get('pcode')?.trim() ?? ''

  const payload = await getPaymentInfo(ref, pcode)
  sendJson(res, payload.success ? 200 : 400, payload)
}

export function paymentInfoMiddleware(): Connect.NextHandleFunction {
  return (req, res, next) => {
    const pathname = req.url?.split('?')[0] ?? ''
    if (!PAYMENT_INFO_PATHS.has(pathname)) {
      next()
      return
    }

    void handlePaymentInfoRequest(req, res)
  }
}
