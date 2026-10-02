# Thames Bank Insurance Portal (Local)

React + Vite payment portal with Realex/Monek sandbox Hosted Payment Page (HPP).

## Quick start

```bash
npm install
npm run dev
```

App runs at **http://localhost:3000**. Payment info is served by **Node** (`server/getPaymentInfo.ts`) — same SOAP logic as the legacy PHP file.

## Test flow

1. Open **http://localhost:3000/CHGX08HQ01**
2. Enter postcode **CM3 5FZ** and click **Submit**
3. Review the payment summary, then click **Pay Now** (Realex lightbox opens)
4. Complete payment on the sandbox HPP (use Realex sandbox test cards from your merchant docs)
5. On success you are redirected to `/payment-success`; on failure to `/payment-failed`

## Routes

| Route | Purpose |
|-------|---------|
| `/:referenceNumber` | Step 1 — Login / postcode validation |
| `/:referenceNumber/summary` | Step 2 & 3 — Payment summary + Pay Now |
| `/payment-success` | Step 4 — Confirmation + success email (mock) |
| `/payment-failed` | Step 4 — Failure + retry + failure email (mock) |

## Payment info API

The summary page calls **`/api/payment-info?ref=REF&pcode=POSTCODE`** (JSON).

| Environment | Handler |
|-------------|---------|
| `npm run dev` | `server/getPaymentInfo.ts` (Vite middleware) |
| `npm run start:server` | Same Node module |
| cPanel (PHP only) | `public/api/get-payment-info.php` (Apache rewrite) |

Core logic lives in **`server/getPaymentInfo.ts`** (OpenGI SOAP → parse XML → JSON).  
Legacy paths `/get-payment-info.php` still work (rewrite / Node alias).

Response shape:

```json
{
  "success": true,
  "error": "",
  "customer_data": { },
  "payment_details": [ ]
}
```

## Architecture

- **Feature-based**: `src/features/auth`, `payment`, `notification`
- **Atomic design**: `src/shared/components/atoms|molecules|organisms`
- **MUI** with **styled components** only (no inline `style` / `sx`)
- **HPP signing**: `server/hppRequest.ts` via `/api/hpp-request` (keeps `SECRET` off the client)
- **Realex script**: `public/rxp-hpp.js` (Global Payments `rxp-js` build)

## Sandbox credentials

Configured in `server/hppRequest.ts` and via environment variables on production.

## Production deployment (ITBeam / cPanel)

### Why localhost works but live fails

`/api/hpp-request` is **not** part of the React build. On localhost, Vite dev middleware signs the payment request. On a static host, unknown paths return **index.html**, so `fetch().json()` throws `Unexpected token '<'`.

### Option A — cPanel + PHP (recommended for static hosting)

After `npm run build`, upload **everything inside `dist/`** to `public_html`, including:

- `api/hpp-request.php`
- `.htaccess` (routes `/api/hpp-request` to PHP; SPA routes go to `index.html`)

Verify in the browser:

`https://online-payment.itbeam.com/api/hpp-request?amount=25660`

You must see **JSON**, not HTML.

### Option B — Node server

```bash
npm run build
npm run start:server
```

Set `PORT` and optional `REALEX_*` env vars. Point the domain to this Node process.

### Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_API_BASE_URL` | Build-time API host. Leave **empty** for same-domain `/api/hpp-request`. |
| `REALEX_MERCHANT_ID` | Server-side only (Node/PHP) — default `THAM016` |
| `REALEX_SECRET` | Server-side only — never in frontend build |
| `REALEX_ACCOUNT` | Server-side only — default `elements02` |
| `REALEX_SERVICE_URL` | Server-side HPP URL — default live `pay.realexpayments.com` |

Copy `.env.example` → `.env.production` before `npm run build`. Default production file uses same-origin API.

### Do not rely on Vite proxy in production

`vite.config.ts` middleware runs **only** during `npm run dev` / `npm run preview`.
