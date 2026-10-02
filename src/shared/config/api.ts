/**
 * API base URL for production builds.
 * - Leave empty (or unset) to use same-origin paths: /api/hpp-request
 * - Set to absolute URL when API runs on another host, e.g. https://api.example.com
 */
export function getApiBaseUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL?.trim() ?? ''
  return base.replace(/\/$/, '')
}

export function getHppRequestApiUrl(): string {
  const base = getApiBaseUrl()
  const path = '/api/hpp-request'
  return base ? `${base}${path}` : path
}

export function getPaymentInfoApiUrl(ref: string, pcode: string): string {
  const base = getApiBaseUrl()
  const path = '/api/payment-info'
  const query = new URLSearchParams({
    ref: ref.trim(),
    pcode: pcode.trim(),
  })
  const url = base ? `${base}${path}` : path
  return `${url}?${query.toString()}`
}
