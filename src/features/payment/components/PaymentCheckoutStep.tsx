import type { ReactNode, RefObject } from 'react'
import Alert from '@mui/material/Alert'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import type { CustomerAddressLines } from '../../../shared/types/paymentInfoApi.types'
import type { EditableAddressLines } from '../utils/resolvePaymentAddress'
import type { AddressUpdateChoice } from './PaymentAddressUpdate'
import { PaymentAddressUpdate } from './PaymentAddressUpdate'
import {
  BillingAddressCard,
  BillingAddressEditButton,
  BillingAddressHeader,
  BillingAddressHint,
  BillingAddressIcon,
  BillingAddressMain,
  BillingAddressText,
  BillingAddressTitle,
  CheckoutPaymentBody,
  CheckoutPaymentHeader,
  CheckoutSecurityFooter,
  CheckoutSubtitle,
  // PaymentSecurityBadge,
  PaymentStepCard,
  PremiumNoticeSecure,
  PremiumSummaryAmount,
  PremiumSummaryCard,
  PremiumSummaryContent,
  PremiumSummaryIcon,
  PremiumSummaryLabel,
  PurchaseTitle,
} from '../styles/PaymentSummaryPage.styles'

interface PaymentCheckoutStepProps {
  totalFormatted: string
  customerAddress: string
  addressChoice: AddressUpdateChoice
  addressLines: EditableAddressLines
  defaultAddressLines: CustomerAddressLines
  isEditingAddress: boolean
  onEditAddress: () => void
  onAddressChoiceChange: (choice: AddressUpdateChoice) => void
  onAddressLineChange: (field: keyof EditableAddressLines, value: string) => void
  paymentForm: ReactNode
  paymentError?: string | null
  paymentSectionRef?: RefObject<HTMLDivElement | null>
}

export function PaymentCheckoutStep({
  totalFormatted,
  customerAddress,
  addressChoice,
  addressLines,
  defaultAddressLines,
  isEditingAddress,
  onEditAddress,
  onAddressChoiceChange,
  onAddressLineChange,
  paymentForm,
  paymentError = null,
  paymentSectionRef,
}: PaymentCheckoutStepProps) {
  return (
    <PaymentStepCard elevation={0}>
      {/* <PaymentSecurityBadge>
        <LockOutlinedIcon sx={{ fontSize: 14, color: '#0f4671' }} />
        <span>Securely processed by Global Paymentsyyy</span>
      </PaymentSecurityBadge> */}

      <PurchaseTitle>Complete Your Purchase</PurchaseTitle>
      <CheckoutSubtitle>
        Enter your payment details below to activate your policy.
      </CheckoutSubtitle>

      <PremiumSummaryCard>
        <PremiumSummaryIcon>
          <GppGoodOutlinedIcon sx={{ fontSize: 26 }} />
        </PremiumSummaryIcon>
        <PremiumSummaryContent>
          <PremiumSummaryLabel>Your total premium is</PremiumSummaryLabel>
          <PremiumSummaryAmount>{totalFormatted}</PremiumSummaryAmount>
          <PremiumNoticeSecure sx={{ m: 0 }}>
            🔒 Secure SSL encrypted payment
          </PremiumNoticeSecure>
        </PremiumSummaryContent>
      </PremiumSummaryCard>

      <BillingAddressCard>
        <BillingAddressHeader>
          <BillingAddressIcon>
            <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />
          </BillingAddressIcon>
          <BillingAddressMain>
            <BillingAddressTitle>Billing address</BillingAddressTitle>
            <BillingAddressText>{customerAddress || '—'}</BillingAddressText>
          </BillingAddressMain>
          <BillingAddressEditButton type="button" onClick={onEditAddress}>
            <EditOutlinedIcon sx={{ fontSize: 14 }} />
            Edit
          </BillingAddressEditButton>
        </BillingAddressHeader>
        <BillingAddressHint>
          Used to verify your payment card. Edit if your card is registered elsewhere.
        </BillingAddressHint>
      </BillingAddressCard>

      {isEditingAddress || addressChoice === 'yes' ? (
        <PaymentAddressUpdate
          choice="yes"
          lines={addressLines}
          defaultLines={defaultAddressLines}
          onChoiceChange={onAddressChoiceChange}
          onLineChange={onAddressLineChange}
          showChoiceControls={false}
        />
      ) : null}

      <CheckoutPaymentHeader>
        <CreditCardOutlinedIcon sx={{ fontSize: 18 }} />
        Payment Details
      </CheckoutPaymentHeader>
      <CheckoutPaymentBody ref={paymentSectionRef}>
        {paymentError ? (
          <Alert severity="error" sx={{ m: 2 }}>
            {paymentError}
          </Alert>
        ) : null}
        {paymentForm}
      </CheckoutPaymentBody>

      <CheckoutSecurityFooter>
        <VerifiedUserOutlinedIcon sx={{ fontSize: 14, color: '#12b76a' }} />
        <span>Your payment is securely processed by Global Payments.</span>
      </CheckoutSecurityFooter>
    </PaymentStepCard>
  )
}
