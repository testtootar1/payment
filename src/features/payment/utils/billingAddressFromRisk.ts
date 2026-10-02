/**
 * riskAddress is stored as "line1, line2, line3, postcode".
 * Live HPP requires structured billing fields (e.g. HPP_BILLING_CITY).
 */
export function billingAddressFromRisk(
  riskAddress: string,
  postcode: string,
): { street1: string; street2: string; city: string } {
  const normalizedPostcode = postcode.replace(/\s+/g, '').toUpperCase()
  const parts = riskAddress
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .filter(
      (part) => part.replace(/\s+/g, '').toUpperCase() !== normalizedPostcode,
    )

  const street1 = parts[0] || 'Address'
  const street2 = parts.length > 2 ? parts[1] : ''
  const city = parts.length >= 3 ? parts[2] : parts[1] || parts[0] || 'Unknown'

  return { street1, street2, city }
}
