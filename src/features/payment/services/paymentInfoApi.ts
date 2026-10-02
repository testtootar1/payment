import { getPaymentInfoApiUrl } from '../../../shared/config/api'
import type { PaymentInfoApiResponse } from '../../../shared/types/paymentInfoApi.types'

export async function fetchPaymentInfo(
  ref: string,
  pcode: string,
): Promise<PaymentInfoApiResponse> {
  const url = getPaymentInfoApiUrl(ref, pcode)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Payment info request failed (${response.status}).`)
  }

  const payload = (await response.json()) as PaymentInfoApiResponse

  const loginStatus = payload.meta?.status ?? payload.customer_data?.Res ?? ''
  const loginFailed =
    Boolean(loginStatus) && !/success/i.test(loginStatus) && loginStatus !== 'OK'

  if (!payload.success || loginFailed) {
    throw new Error(
      payload.error ||
        (loginFailed
          ? 'We could not match this policy reference and postcode. Please check and try again.'
          : 'Unable to load payment information.'),
    )
  }

  return payload
}
