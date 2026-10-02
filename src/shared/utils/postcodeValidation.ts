export function normalizePostcode(postcode: string): string {
  return postcode.replace(/\s+/g, '').toUpperCase()
}

export function isValidUkPostcodeFormat(postcode: string): boolean {
  const normalized = normalizePostcode(postcode)
  return /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(normalized)
}

export function postcodesMatch(input: string, expected: string): boolean {
  return normalizePostcode(input) === normalizePostcode(expected)
}
