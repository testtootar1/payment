/**
 * Production Node server: static files + /api/hpp-request
 * Use when ITBeam/cPanel supports Node, or run behind a reverse proxy.
 */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleHppRequest } from './hppRequest.js'
import { handlePaymentInfoRequest } from './paymentInfo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, '../dist')
const PORT = Number(process.env.PORT ?? 3000)

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

async function serveStatic(
  pathname: string,
  res: import('node:http').ServerResponse,
): Promise<boolean> {
  const safePath = pathname.replace(/^\/+/, '') || 'index.html'
  const filePath = path.join(DIST_DIR, safePath)

  if (!filePath.startsWith(DIST_DIR)) {
    return false
  }

  let target = filePath
  if (!existsSync(target) || path.extname(target) === '') {
    target = path.join(DIST_DIR, 'index.html')
  }

  if (!existsSync(target)) {
    return false
  }

  const ext = path.extname(target)
  const body = await readFile(target)
  res.statusCode = 200
  res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
  res.end(body)
  return true
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)

  if (url.pathname === '/api/hpp-request') {
    handleHppRequest(req, res)
    return
  }

  if (
    url.pathname === '/api/payment-info' ||
    url.pathname === '/get-payment-info.php'
  ) {
    void handlePaymentInfoRequest(req, res)
    return
  }

  const served = await serveStatic(url.pathname, res)
  if (!served) {
    res.statusCode = 404
    res.end('Not found')
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`Serving static files from ${DIST_DIR}`)
})
