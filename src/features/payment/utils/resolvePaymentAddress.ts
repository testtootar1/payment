import type { CustomerAddressLines } from '../../../shared/types/paymentInfoApi.types'

export interface EditableAddressLines {
  line1: string
  line2: string
  line3: string
}

export function formatAddressFromLines(
  lines: EditableAddressLines,
  postcode: string,
): string {
  return [lines.line1, lines.line2, lines.line3, postcode]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ')
}

function hasAddressChanged(
  edited: EditableAddressLines,
  defaults: CustomerAddressLines,
): boolean {
  return (
    edited.line1.trim() !== defaults.line1.trim() ||
    edited.line2.trim() !== defaults.line2.trim() ||
    edited.line3.trim() !== defaults.line3.trim()
  )
}

export function resolvePaymentAddress(options: {
  defaultAddress: string
  defaultLines: CustomerAddressLines
  choice: 'yes' | 'no'
  editedLines: EditableAddressLines
}): string {
  const { defaultAddress, defaultLines, choice, editedLines } = options

  if (choice === 'no') {
    return defaultAddress
  }

  if (!hasAddressChanged(editedLines, defaultLines)) {
    return defaultAddress
  }

  const formatted = formatAddressFromLines(editedLines, defaultLines.postcode)
  return formatted || defaultAddress
}
