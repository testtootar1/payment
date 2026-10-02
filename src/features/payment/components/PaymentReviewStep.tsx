import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
// import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import GppGoodOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
// import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import type { PaymentItem } from '../../../shared/types/paymentInfoApi.types'
import { LEGACY_LINKS } from '../../../shared/constants/legacyAssets'
import { formatCurrency } from '../../../shared/utils/formatters'
import {
  ContinuePaymentButton,
  CustomerInfoCard,
  CustomerInfoContent,
  CustomerInfoIcon,
  CustomerInfoLabel,
  CustomerInfoRow,
  CustomerInfoValue,
  OutstandingBalanceAmount,
  OutstandingBalanceIcon,
  OutstandingBalanceLabel,
  OutstandingBalanceSection,
  OutstandingBalanceText,
  // PaymentSecurityBadge,
  PaymentSecurityFooter,
  PaymentStepCard,
  PaymentTotalRow,
  PaymentTotalsBox,
  PaymentTrustBar,
  PaymentTrustItem,
  PaymentsSelectedCard,
  PaymentsSelectedHeading,
  ReviewPaymentItem,
  ReviewPaymentItemAmount,
  ReviewPaymentItemBody,
  ReviewPaymentItemMeta,
  ReviewPaymentItemTitle,
  TermsCheckboxRow,
  TermsLink,
} from '../styles/PaymentSummaryPage.styles'

interface PaymentReviewStepProps {
  totalFormatted: string
  customerName: string
  customerAddress: string
  policyNumber: string
  paymentItems: PaymentItem[]
  selectedIds: string[]
  onToggleItem: (id: string) => void
  termsAccepted: boolean
  onTermsChange: (accepted: boolean) => void
  onContinue: () => void
  continueDisabled: boolean
}

export function PaymentReviewStep({
  totalFormatted,
  customerName,
  customerAddress,
  policyNumber,
  paymentItems,
  selectedIds,
  onToggleItem,
  termsAccepted,
  onTermsChange,
  onContinue,
  continueDisabled,
}: PaymentReviewStepProps) {
  const selectedCount = selectedIds.length

  return (
    <PaymentStepCard elevation={0}>
      {/* <PaymentSecurityBadge>
        <LockOutlinedIcon sx={{ fontSize: 14, color: '#0f4671' }} />
        <span>Securely processed by Global Payments</span>
      </PaymentSecurityBadge> */}

      <OutstandingBalanceSection>
        <OutstandingBalanceText>
          <OutstandingBalanceLabel>Outstanding Balance</OutstandingBalanceLabel>
          <OutstandingBalanceAmount>{totalFormatted}</OutstandingBalanceAmount>
        </OutstandingBalanceText>
        <OutstandingBalanceIcon>
          <GppGoodOutlinedIcon sx={{ fontSize: 32, color: '#0f4671' }} />
        </OutstandingBalanceIcon>
      </OutstandingBalanceSection>

      <CustomerInfoCard>
        <CustomerInfoRow>
          <CustomerInfoIcon>
            <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />
          </CustomerInfoIcon>
          <CustomerInfoContent>
            <CustomerInfoLabel>Name</CustomerInfoLabel>
            <CustomerInfoValue>{customerName || '—'}</CustomerInfoValue>
          </CustomerInfoContent>
        </CustomerInfoRow>
        <CustomerInfoRow>
          <CustomerInfoIcon>
            <HomeOutlinedIcon sx={{ fontSize: 18 }} />
          </CustomerInfoIcon>
          <CustomerInfoContent>
            <CustomerInfoLabel>Risk Address</CustomerInfoLabel>
            <CustomerInfoValue>{customerAddress || '—'}</CustomerInfoValue>
          </CustomerInfoContent>
        </CustomerInfoRow>
        <CustomerInfoRow>
          <CustomerInfoIcon>
            <ShieldOutlinedIcon sx={{ fontSize: 18 }} />
          </CustomerInfoIcon>
          <CustomerInfoContent>
            <CustomerInfoLabel>Policy Number</CustomerInfoLabel>
            <CustomerInfoValue>{policyNumber || '—'}</CustomerInfoValue>
          </CustomerInfoContent>
        </CustomerInfoRow>
      </CustomerInfoCard>

      <PaymentsSelectedHeading>
        Payments Selected ({selectedCount})
      </PaymentsSelectedHeading>

      <PaymentsSelectedCard>
        {paymentItems.map((item) => (
          <ReviewPaymentItem key={item.id}>
            <Checkbox
              checked={selectedIds.includes(item.id)}
              onChange={(_event, checked) => {
                if (checked !== selectedIds.includes(item.id)) {
                  onToggleItem(item.id)
                }
              }}
              color="primary"
              size="small"
              sx={{ p: 0, mt: 0.25 }}
              aria-label={`Select ${item.description}`}
            />
            <ReviewPaymentItemBody>
              <ReviewPaymentItemTitle>{item.description}</ReviewPaymentItemTitle>
              <ReviewPaymentItemMeta>
                <CalendarTodayOutlinedIcon sx={{ fontSize: 13 }} />
                <span>Effective Date {item.dueDate}</span>
              </ReviewPaymentItemMeta>
            </ReviewPaymentItemBody>
            <ReviewPaymentItemAmount>
              {formatCurrency(item.amount)}
            </ReviewPaymentItemAmount>
          </ReviewPaymentItem>
        ))}

        <PaymentTotalsBox>
          <PaymentTotalRow>
            <span>Items Selected</span>
            <strong>{selectedCount}</strong>
          </PaymentTotalRow>
          <PaymentTotalRow>
            <span>
              <strong>Total Amount Payable</strong>
            </span>
            <strong>{totalFormatted}</strong>
          </PaymentTotalRow>
        </PaymentTotalsBox>
      </PaymentsSelectedCard>

      <PaymentTrustBar>
        <PaymentTrustItem>
          <LockOutlinedIcon />
          <span>
            256-bit SSL
            <br />
            {' encryption'}
          </span>
        </PaymentTrustItem>
        <PaymentTrustItem>
          <VerifiedUserOutlinedIcon />
          <span>
            Securely processed
            <br />
            {' by Global Payments'}
          </span>
        </PaymentTrustItem>
        <PaymentTrustItem>
          <AccountBalanceOutlinedIcon />
          <span>
            FCA authorised
            <br />
            {' insurance broker'}
          </span>
        </PaymentTrustItem>
      </PaymentTrustBar>

      <TermsCheckboxRow>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={(_event, checked) => onTermsChange(checked)}
              color="primary"
              size="small"
            />
          }
          label={
            <>
              I confirm I have read and agree to the Thamesbank Insurance Services{' '}
              <TermsLink
                href={LEGACY_LINKS.termsOfBusiness}
                target="_blank"
                rel="noreferrer"
              >
                Terms of Business
              </TermsLink>
              .
            </>
          }
        />
      </TermsCheckboxRow>

      <ContinuePaymentButton
        type="button"
        variant="contained"
        disableElevation
        onClick={onContinue}
        disabled={continueDisabled || !termsAccepted}
        startIcon={<LockOutlinedIcon />}
      >
        Continue to Payment
      </ContinuePaymentButton>

      <PaymentSecurityFooter>
        <ShieldOutlinedIcon sx={{ fontSize: 14 }} />
        <span>You&apos;re safe with us. Your payment is secure and encrypted.</span>
      </PaymentSecurityFooter>
    </PaymentStepCard>
  )
}
