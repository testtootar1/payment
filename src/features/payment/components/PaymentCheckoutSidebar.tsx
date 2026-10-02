import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LEGACY_IMAGES, LEGACY_LINKS } from '../../../shared/constants/legacyAssets'
import { formatCurrency } from '../../../shared/utils/formatters'
import type { CustomerSummary } from '../../../shared/types/paymentInfoApi.types'
import {
  SidebarColumn,
  SidebarReviewsBrand,
  SidebarReviewsCard,
  SidebarReviewsHeading,
  SidebarReviewsInner,
  SidebarReviewsText,
  SidebarSecureCard,
  SidebarSecureLogo,
  SidebarSecureText,
  SidebarSecureTitle,
  SidebarSummaryCard,
  SidebarSummaryNote,
  SidebarSummaryReference,
  SidebarSummaryRow,
  SidebarSummaryTitle,
  SidebarWhyCard,
  SidebarWhyList,
  SidebarWhyRow,
  SidebarWhyTitle,
  TermsLink,
} from '../styles/PaymentSummaryPage.styles'

const TRUST_POINTS = [
  '250,000+ Customers Served',
  'Family-Owned Since 1989',
  'UK-Based Customer Support',
  'InsurTech of the Year 2026 Winner',
] as const

interface PaymentCheckoutSidebarProps {
  customer: CustomerSummary
  itemsSelected: number
  subtotal: number
  currency?: string
}

function TrustpilotStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#00b67a" aria-hidden>
      <path d="M12 0l3.09 9.5h10.01l-8.09 5.8 3.09 9.5-8.1-5.9-8.09 5.9 3.09-9.5-8.09-5.8h10.01z" />
    </svg>
  )
}

export function PaymentCheckoutSidebar({
  customer,
  itemsSelected,
  subtotal,
  currency = 'GBP',
}: PaymentCheckoutSidebarProps) {
  const formattedTotal = formatCurrency(subtotal, currency)

  return (
    <SidebarColumn>
      <SidebarSummaryCard elevation={0}>
        <SidebarSummaryTitle>Your Payment Summary</SidebarSummaryTitle>
        <SidebarSummaryReference>
          Quote reference: {customer.reference || '—'}
        </SidebarSummaryReference>
        <SidebarSummaryRow>
          <span>Items selected</span>
          <strong>{itemsSelected}</strong>
        </SidebarSummaryRow>
        <SidebarSummaryRow sx={{ borderBottom: 'none' }}>
          <span style={{ fontWeight: 600 }}>Total Amount Payable</span>
          <strong>{formattedTotal}</strong>
        </SidebarSummaryRow>
        <SidebarSummaryNote>
          Note: All figures include Insurance Premium Tax where applicable.
        </SidebarSummaryNote>
      </SidebarSummaryCard>

      <SidebarWhyCard elevation={0}>
        <SidebarWhyTitle>Why customers choose Thamesbank?</SidebarWhyTitle>
        <SidebarWhyList>
          {TRUST_POINTS.map((point) => (
            <SidebarWhyRow key={point}>
              <CheckCircleIcon sx={{ fontSize: 20, color: '#98c13f' }} />
              <span>{point}</span>
            </SidebarWhyRow>
          ))}
        </SidebarWhyList>
      </SidebarWhyCard>

      <SidebarReviewsCard elevation={0}>
        <SidebarReviewsHeading>Rated Excellent by our customers</SidebarReviewsHeading>
        <SidebarReviewsInner>
          <SidebarReviewsText>See our 684 reviews on</SidebarReviewsText>
          <SidebarReviewsBrand>
            <TrustpilotStar />
            <span>Trustpilot</span>
          </SidebarReviewsBrand>
        </SidebarReviewsInner>
      </SidebarReviewsCard>

      <SidebarSecureCard elevation={0}>
        <SidebarSecureTitle>Your payment is secure</SidebarSecureTitle>
        <SidebarSecureText>
          Protected by 256-bit SSL encryption and processed in line with UK data
          protection laws.
        </SidebarSecureText>
        <SidebarSecureText>
          Read our{' '}
          <TermsLink href={LEGACY_LINKS.privacyNotice} target="_blank" rel="noreferrer">
            Privacy Notice
          </TermsLink>{' '}
          to learn how we handle and safeguard your data.
        </SidebarSecureText>
        <SidebarSecureLogo src={LEGACY_IMAGES.godaddy} alt="Verified and secured" />
      </SidebarSecureCard>
    </SidebarColumn>
  )
}
