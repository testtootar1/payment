import { getHppRequestApiUrl } from '../../../shared/config/api'

export async function fetchHppRequestPayload(params: {
  amountMinor: number
  orderId: string
  street1: string
  street2?: string
  city: string
  postcode: string
  comment: string
}): Promise<Record<string, string>> {
  const search = new URLSearchParams({
    amount: String(params.amountMinor),
    orderId: params.orderId,
    street1: params.street1,
    city: params.city,
    postcode: params.postcode,
    comment: params.comment,
  })
  if (params.street2?.trim()) {
    search.set('street2', params.street2.trim())
  }

  const url = `${getHppRequestApiUrl()}?${search.toString()}`
  const response = await fetch(url)

  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    const snippet = (await response.text()).slice(0, 80).toLowerCase()
    if (snippet.includes('<!doctype') || snippet.includes('<html')) {
      throw new Error(
        `Payment API returned HTML instead of JSON (${url}). ` +
          'On production, deploy the /api/hpp-request endpoint (see public/api/hpp-request.php or npm run start:server).',
      )
    }
    throw new Error('Payment API returned an invalid response.')
  }

  if (!response.ok) {
    throw new Error(`Unable to prepare payment request (${response.status}).`)
  }

  return response.json() as Promise<Record<string, string>>
}
