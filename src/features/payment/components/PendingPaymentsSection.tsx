import type { ReactNode, RefObject } from 'react'
import { useState } from 'react'
import type {
  CustomerAddressLines,
  PaymentItem,
} from '../../../shared/types/paymentInfoApi.types'
import type { EditableAddressLines } from '../utils/resolvePaymentAddress'
import type { AddressUpdateChoice } from './PaymentAddressUpdate'
import { PaymentCheckoutStep } from './PaymentCheckoutStep'
import { PaymentReviewStep } from './PaymentReviewStep'

interface PendingPaymentsSectionProps {
  paymentItems: PaymentItem[]
  selectedIds: string[]
  onToggleItem: (id: string) => void
  addressChoice: AddressUpdateChoice
  addressLines: EditableAddressLines
  defaultAddressLines: CustomerAddressLines
  onAddressChoiceChange: (choice: AddressUpdateChoice) => void
  onAddressLineChange: (field: keyof EditableAddressLines, value: string) => void
  customerName: string
  riskAddress: string
  billingAddress: string
  policyNumber: string
  totalFormatted: string
  onPaySecurely: () => void
  payDisabled: boolean
  showPaymentForm?: boolean
  paymentForm?: ReactNode
  paymentError?: string | null
  paymentSectionRef?: RefObject<HTMLDivElement | null>
}

export function PendingPaymentsSection({
  paymentItems,
  selectedIds,
  onToggleItem,
  addressChoice,
  addressLines,
  defaultAddressLines,
  onAddressChoiceChange,
  onAddressLineChange,
  customerName,
  riskAddress,
  billingAddress,
  policyNumber,
  totalFormatted,
  onPaySecurely,
  payDisabled,
  showPaymentForm = false,
  paymentForm = null,
  paymentError = null,
  paymentSectionRef,
}: PendingPaymentsSectionProps) {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  const handleEditAddress = () => {
    setIsEditingAddress(true)
    onAddressChoiceChange('yes')
  }

  if (showPaymentForm && paymentForm) {
    return (
      <PaymentCheckoutStep
        totalFormatted={totalFormatted}
        customerAddress={billingAddress}
        addressChoice={addressChoice}
        addressLines={addressLines}
        defaultAddressLines={defaultAddressLines}
        isEditingAddress={isEditingAddress}
        onEditAddress={handleEditAddress}
        onAddressChoiceChange={onAddressChoiceChange}
        onAddressLineChange={onAddressLineChange}
        paymentForm={paymentForm}
        paymentError={paymentError}
        paymentSectionRef={paymentSectionRef}
      />
    )
  }

  return (
    <PaymentReviewStep
      totalFormatted={totalFormatted}
      customerName={customerName}
      customerAddress={riskAddress}
      policyNumber={policyNumber}
      paymentItems={paymentItems}
      selectedIds={selectedIds}
      onToggleItem={onToggleItem}
      termsAccepted={termsAccepted}
      onTermsChange={setTermsAccepted}
      onContinue={onPaySecurely}
      continueDisabled={payDisabled}
    />
  )
}
