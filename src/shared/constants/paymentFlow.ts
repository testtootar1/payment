export const PAYMENT_FLOW_STEPS = [
  { id: 1, label: 'Verify Identity' },
  { id: 2, label: 'Payment Summary' },
  { id: 3, label: 'Pay & Confirm' },
] as const

export type PaymentFlowStepId = (typeof PAYMENT_FLOW_STEPS)[number]['id']

export function parsePageSubtitle(subtitle: string): {
  stepText: string
  label: string
  activeStep: PaymentFlowStepId
} {
  const match = subtitle.match(/^Step\s+(.+?)\s*[—–-]\s*(.+)$/i)
  const stepText = match?.[1]?.trim() ?? ''
  const label = match?.[2]?.trim() ?? subtitle

  let activeStep: PaymentFlowStepId = 1
  if (/2|3/.test(stepText) && /summary/i.test(label)) {
    activeStep = 2
  } else if (/4|success|fail|confirm/i.test(label)) {
    activeStep = 3
  } else if (/1|verify|auth/i.test(label)) {
    activeStep = 1
  }

  return { stepText, label, activeStep }
}
