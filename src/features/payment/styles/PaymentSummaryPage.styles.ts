import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { BRAND_COLORS } from '../../../shared/constants/branding'

export const SummaryPageRoot = styled(Box)(() => ({
  backgroundColor: '#f1f9fe',
  paddingTop: 32,
  paddingBottom: 48,
  minHeight: '60vh',
}))

export const SummaryGridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  maxWidth: 520,
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: 720,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 1100,
    gridTemplateColumns: 'minmax(0, 2fr) minmax(280px, 1fr)',
    alignItems: 'start',
  },
}))

export const SummaryLeftColumn = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export const PendingPaymentsCard = styled(Card)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 12,
  border: '1px solid #e5e7eb',
  boxShadow: '12px 12px 25px -5px rgba(0, 0, 0, 0.1)',
  padding: '20px 24px 24px',
  position: 'relative',
}))

export const PurchaseTitle = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: '1.5rem',
  color: '#000000',
  marginBottom: 24,
  marginTop: 4,
}))

export const PremiumNoticeBox = styled(Box)(() => ({
  padding: '14px 16px',
  marginBottom: 24,
  backgroundColor: '#e8f4fd',
  borderRadius: 8,
  borderLeft: '4px solid #0f4671',
}))

export const PremiumNoticeText = styled(Typography)(() => ({
  margin: 0,
  color: '#22242f',
  fontSize: '0.8125rem',
  lineHeight: 1.6,
}))

export const PremiumNoticeSecure = styled(Typography)(() => ({
  margin: '8px 0 0',
  color: '#0f4671',
  fontSize: '0.8125rem',
  fontWeight: 500,
}))

export const PendingPaymentsHeading = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1rem',
  color: BRAND_COLORS.textDark,
  marginBottom: 8,
}))

export const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.65rem',
  color: BRAND_COLORS.textDark,
  marginBottom: 8,
}))

export const SectionIntro = styled(Typography)(() => ({
  color: BRAND_COLORS.textMuted,
  fontSize: '0.95rem',
  lineHeight: 1.5,
  marginBottom: 20,
}))

export const SelectionToolbar = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  marginBottom: 16,
  flexWrap: 'wrap',
}))

export const ActionLink = styled(Typography)(() => ({
  color: BRAND_COLORS.blue,
  cursor: 'pointer',
  fontSize: '0.95rem',
  textDecoration: 'underline',
  '&:hover': {
    color: BRAND_COLORS.navy,
  },
}))

export const PaymentItemsList = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}))

export const ConfirmDetailsCard = styled(Card)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  marginTop: 20,
  overflow: 'hidden',
}))

export const ConfirmDetailsHeader = styled(Box)(() => ({
  backgroundColor: '#0f4671',
  color: '#ffffff',
  fontWeight: 500,
  fontSize: '1rem',
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: '#0d3b61',
  },
}))

export const ConfirmDetailsHeaderIcon = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ffffff',
  borderRadius: '50%',
  padding: 6,
  flexShrink: 0,
}))

export const PaymentFormContainer = styled(Box)(() => ({
  marginTop: 24,
  padding: '16px 20px',
  backgroundColor: '#ffffff',
  borderRadius: 12,
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  '& .payment-inline-form': {
    marginTop: 0,
    padding: 0,
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
  },
}))

export const ConfirmDetailsBody = styled(Box)(() => ({
  padding: '14px 18px 18px',
}))

export const ConfirmDetailsRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 12,
  padding: '6px 0',
  borderBottom: '1px solid #e5e7eb',
}))

export const ConfirmDetailsLabel = styled(Typography)(() => ({
  color: '#22242f',
  fontSize: '0.8125rem',
  fontWeight: 400,
  flex: 1,
}))

export const ConfirmDetailsValue = styled(Typography)(() => ({
  color: '#22242f',
  fontSize: '0.8125rem',
  lineHeight: 1.5,
  textAlign: 'right',
  wordBreak: 'break-word',
  flex: 1,
}))

export const ConfirmDetailsQuestion = styled(Typography)(() => ({
  marginTop: 14,
  marginBottom: 10,
  color: BRAND_COLORS.textDark,
  fontSize: '0.9rem',
  fontWeight: 600,
}))

export const ConfirmDetailsActions = styled(Box)(() => ({
  display: 'flex',
  gap: 12,
}))

export const ConfirmDetailsButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  minWidth: 86,
  padding: '8px 22px',
  fontSize: '0.9rem',
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
  borderRadius: 6,
  border: `1px solid ${BRAND_COLORS.navy}`,
  backgroundColor: active ? BRAND_COLORS.navy : '#ffffff',
  color: active ? '#ffffff' : BRAND_COLORS.navy,
  transition: 'background-color 0.15s ease, color 0.15s ease',
}))

export const PaymentItemPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  border: `1px solid ${selected ? '#c5d4e3' : '#dde3ea'}`,
  backgroundColor: selected ? '#eef4fa' : '#ffffff',
  borderRadius: 8,
  padding: '16px 18px',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: 8,
    rowGap: 6,
  },
}))

export const PaymentItemHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
  [theme.breakpoints.down('md')]: {
    display: 'contents',
  },
}))

export const PaymentItemBody = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    display: 'contents',
  },
}))

export const PaymentItemMainRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 6,
  [theme.breakpoints.down('md')]: {
    gridColumn: 2,
    gridRow: 1,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 0,
  },
}))

export const PaymentItemDetails = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingLeft: 0,
  },
  [theme.breakpoints.down('md')]: {
    gridColumn: '1 / -1',
    paddingLeft: 15,
    marginTop: 0,
  },
}))

export const ItemTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1rem',
  color: BRAND_COLORS.textDark,
}))

export const ViewScheduleLink = styled('a')(() => ({
  color: BRAND_COLORS.blue,
  fontSize: '0.875rem',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  '&:hover': {
    textDecoration: 'underline',
    color: BRAND_COLORS.navy,
  },
}))

export const ViewScheduleLinkDesktop = styled(ViewScheduleLink)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const ViewScheduleLinkMobile = styled(ViewScheduleLink)(({ theme }) => ({
  marginBottom: 4,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

export const PaymentItemMeta = styled(Typography)(() => ({
  color: BRAND_COLORS.textMuted,
  fontSize: '0.875rem',
  lineHeight: 1.55,
}))

export const PaymentAmount = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.05rem',
  color: BRAND_COLORS.textDark,
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '&.payment-amount--mobile': {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  '&.payment-amount--desktop': {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}))

export const SidebarTrustpilotWrap = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 4,
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
}))

export const SidebarSummaryCard = styled(Card)(() => ({
  backgroundColor: '#198754',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  color: '#ffffff',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  padding: '16px',
}))

export const SidebarSummaryTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1rem',
  marginBottom: 4,
  color: '#ffffff',
}))

export const SidebarSummaryReference = styled(Typography)(() => ({
  fontSize: '0.72rem',
  color: 'rgba(255,255,255,0.9)',
  marginBottom: 12,
}))

export const SidebarSummaryRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '6px 0',
  fontSize: '0.8rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
}))

export const SidebarSummaryNote = styled(Typography)(() => ({
  marginTop: 10,
  fontSize: '0.66rem',
  color: 'rgba(255,255,255,0.86)',
  lineHeight: 1.35,
}))

export const SidebarWhyCard = styled(Card)(() => ({
  backgroundColor: '#0e4570',
  borderRadius: 8,
  color: '#ffffff',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  padding: 16,
}))

export const SidebarWhyTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.125rem',
  lineHeight: 1.25,
  marginBottom: 12,
  color: '#ffffff',
}))

export const SidebarWhyList = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}))

export const SidebarWhyRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  color: '#ffffff',
  fontSize: '0.8125rem',
  fontWeight: 500,
}))

export const SidebarReviewsCard = styled(Card)(() => ({
  backgroundColor: '#0e4570',
  borderRadius: 8,
  color: '#ffffff',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

export const SidebarReviewsHeading = styled(Typography)(() => ({
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '0.625rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  opacity: 0.8,
  marginBottom: 8,
  textAlign: 'center',
}))

export const SidebarReviewsInner = styled(Box)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 6,
  padding: '6px 12px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: '100%',
}))

export const SidebarReviewsText = styled(Typography)(() => ({
  color: '#22242f',
  fontSize: '0.6875rem',
  fontWeight: 500,
}))

export const SidebarReviewsBrand = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: '#22242f',
  fontWeight: 700,
  fontSize: '0.75rem',
}))

export const SidebarSecureCard = styled(Card)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 8,
  border: '1px solid #f3f4f6',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  padding: 16,
}))

export const SidebarSecureTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.25rem',
  lineHeight: 1.2,
  marginBottom: 8,
  color: '#22242f',
}))

export const SidebarSecureText = styled(Typography)(() => ({
  fontSize: '0.75rem',
  color: '#555555',
  lineHeight: 1.45,
  marginBottom: 8,
}))

export const SidebarSecureLogo = styled('img')(() => ({
  width: '100%',
  maxWidth: 240,
  height: 'auto',
  borderRadius: 4,
  marginTop: 8,
}))

export const AddressUpdateCard = styled(Card)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 51, 102, 0.08)',
  padding: '22px 24px',
  marginTop: 16,
}))

export const AddressUpdateQuestion = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '0.95rem',
  color: BRAND_COLORS.textDark,
  marginBottom: 14,
}))

export const AddressChoiceRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 16,
}))

export const AddressChoiceButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  minWidth: 88,
  padding: '10px 28px',
  fontSize: '0.95rem',
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
  borderRadius: 6,
  border: `2px solid ${BRAND_COLORS.navy}`,
  backgroundColor: active ? BRAND_COLORS.navy : '#ffffff',
  color: active ? '#ffffff' : BRAND_COLORS.navy,
  transition: 'background-color 0.15s ease, color 0.15s ease',
}))

export const AddressFieldsBox = styled(Box)(() => ({
  backgroundColor: '#e8f4fc',
  borderRadius: 8,
  padding: '18px 20px',
}))

export const AddressFieldsRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
}))

export const AddressFieldsLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.95rem',
  color: BRAND_COLORS.textDark,
  [theme.breakpoints.up('sm')]: {
    paddingTop: 8,
    minWidth: 72,
  },
}))

export const AddressFieldsColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  flex: 1,
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
}))

export const AddressFieldsInputs = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  flex: 1,
}))

export const PaymentDetailsCard = styled(Card)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 51, 102, 0.08)',
  marginTop: 16,
  overflow: 'hidden',
}))

export const PaymentDetailsHeader = styled(Box)(() => ({
  backgroundColor: '#3d4f5f',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '1rem',
  padding: '14px 20px',
}))

export const PaymentDetailsBody = styled(Box)(() => ({
  padding: '20px',
  '& .payment-inline-form': {
    marginTop: 0,
    padding: 0,
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
  },
}))

export const PaymentDetailsAlert = styled(Box)(() => ({
  marginBottom: 16,
}))

export const SidebarColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  [theme.breakpoints.up('lg')]: {
    position: 'sticky',
    top: theme.spacing(2),
  },
}))

export const SidebarCard = styled(Card)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 51, 102, 0.08)',
  padding: '24px 24px 22px',
}))

export const SidebarCardTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.2rem',
  marginBottom: 18,
  color: BRAND_COLORS.navy,
}))

export const CustomerRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  marginBottom: 16,
}))

export const CustomerAvatar = styled(Box)(() => ({
  width: 52,
  height: 52,
  borderRadius: '50%',
  backgroundColor: '#e8f1f8',
  color: BRAND_COLORS.navy,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

export const CustomerWelcome = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '1rem',
  color: BRAND_COLORS.textDark,
}))

export const AddressLabel = styled(Typography)(() => ({
  color: BRAND_COLORS.textMuted,
  fontSize: '0.9rem',
  lineHeight: 1.55,
}))

export const DetailsDivider = styled(Divider)(() => ({
  marginBottom: 14,
}))

export const SessionNotice = styled(Typography)(() => ({
  fontSize: '0.875rem',
  color: BRAND_COLORS.textMuted,
  marginBottom: 16,
  lineHeight: 1.45,
}))

export const SessionTimer = styled('span')(() => ({
  fontWeight: 600,
  color: BRAND_COLORS.textDark,
}))

export const SummaryLine = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 8,
  color: BRAND_COLORS.textMuted,
  fontSize: '0.95rem',
}))

export const SummaryLineValue = styled('span')(() => ({
  color: BRAND_COLORS.textDark,
  fontWeight: 500,
}))

export const SummaryTotal = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.05rem',
  marginTop: 10,
  marginBottom: 18,
  color: BRAND_COLORS.textDark,
}))

export const TermsRow = styled(Box)(() => ({
  marginBottom: 4,
}))

export const TermsLabel = styled(Typography)(() => ({
  fontSize: '0.85rem',
  color: BRAND_COLORS.textMuted,
  lineHeight: 1.45,
}))

export const TermsLink = styled('a')(() => ({
  color: BRAND_COLORS.blue,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

export const RequiredMark = styled('span')(() => ({
  color: '#d32f2f',
}))

export const ButtonRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginTop: 8,
}))

export const PaySecurelyButton = styled(Button)(() => ({
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  paddingTop: 12,
  paddingBottom: 12,
  backgroundColor: BRAND_COLORS.navy,
  '&:hover': {
    backgroundColor: '#002244',
  },
  '&.Mui-disabled': {
    backgroundColor: '#b8c5d4',
    color: '#ffffff',
  },
}))

export const SidebarPaymentFormSection = styled(Box)(() => ({
  marginTop: 16,
  width: '100%',
}))

export const AlertSpacing = styled(Box)(() => ({
  marginBottom: 16,
}))

export const PaymentStepCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: 16,
  border: '1px solid #e8edf2',
  boxShadow: '0 4px 20px rgba(15, 70, 113, 0.06)',
  padding: '20px 16px 24px',
  [theme.breakpoints.up('sm')]: {
    padding: '24px 28px 28px',
  },
}))

export const PaymentSecurityBadge = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 6,
  marginBottom: 20,
  color: '#475467',
  fontSize: '0.68rem',
  lineHeight: 1.3,
  textAlign: 'right',
}))

export const OutstandingBalanceSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  marginBottom: 20,
}))

export const OutstandingBalanceText = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}))

export const OutstandingBalanceLabel = styled(Typography)(() => ({
  fontSize: '0.875rem',
  color: '#667085',
  marginBottom: 4,
}))

export const OutstandingBalanceAmount = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '2rem',
  color: '#0f4671',
  lineHeight: 1.1,
}))

export const OutstandingBalanceIcon = styled(Box)(() => ({
  width: 72,
  height: 72,
  borderRadius: '50%',
  backgroundColor: '#e8f4fd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

export const CustomerInfoCard = styled(Box)(() => ({
  border: '1px solid #e8edf2',
  borderRadius: 12,
  overflow: 'hidden',
  marginBottom: 20,
}))

export const CustomerInfoRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: '14px 16px',
  borderBottom: '1px solid #eef2f6',
  '&:last-child': {
    borderBottom: 'none',
  },
}))

export const CustomerInfoIcon = styled(Box)(() => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: '#e8f4fd',
  color: '#0f4671',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

export const CustomerInfoContent = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}))

export const CustomerInfoLabel = styled(Typography)(() => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#0f4671',
  marginBottom: 2,
}))

export const CustomerInfoValue = styled(Typography)(() => ({
  fontSize: '0.8125rem',
  color: '#344054',
  lineHeight: 1.45,
  wordBreak: 'break-word',
}))

export const PaymentsSelectedHeading = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '0.9375rem',
  color: '#0f4671',
  marginBottom: 12,
}))

export const PaymentsSelectedCard = styled(Box)(() => ({
  border: '1px solid #e8edf2',
  borderRadius: 12,
  overflow: 'hidden',
  marginBottom: 16,
}))

export const ReviewPaymentItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  padding: '14px 16px',
  borderBottom: '1px solid #eef2f6',
  backgroundColor: '#ffffff',
}))

export const ReviewPaymentItemBody = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}))

export const ReviewPaymentItemTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '0.875rem',
  color: '#0f4671',
  marginBottom: 4,
}))

export const ReviewPaymentItemMeta = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: '#667085',
  fontSize: '0.75rem',
}))

export const ReviewPaymentItemAmount = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '0.875rem',
  color: '#0f4671',
  whiteSpace: 'nowrap',
  flexShrink: 0,
}))

export const PaymentTotalsBox = styled(Box)(() => ({
  backgroundColor: '#e8f4fd',
  padding: '12px 16px',
}))

export const PaymentTotalRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '4px 0',
  fontSize: '0.8125rem',
  color: '#344054',
  '& strong': {
    color: '#0f4671',
    fontWeight: 700,
  },
}))

export const PaymentTrustBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 8px',
  marginBottom: 16,
  borderRadius: 10,
  backgroundColor: '#f3f7fb',
  border: '1px solid #e8eef5',
  [theme.breakpoints.up('sm')]: {
    padding: '12px 10px',
  },
}))

export const PaymentTrustItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 4,
  flex: 1,
  minWidth: 0,
  padding: '0 4px',
  '&:not(:last-child)': {
    borderRight: '1px solid #d0dae6',
  },
  '& .MuiSvgIcon-root': {
    color: '#12b76a',
    fontSize: 14,
    flexShrink: 0,
    marginTop: 1,
  },
  '& span': {
    minWidth: 0,
    color: '#0f4671',
    fontSize: '8px',
    fontWeight: 500,
    lineHeight: 1.2,
    textAlign: 'left',
  },
  '& br': {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    padding: '0 6px',
    '& span': {
      fontSize: '0.68rem',
      lineHeight: 1.25,
    },
  },
}))

export const TermsCheckboxRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 16,
  '& .MuiFormControlLabel-root': {
    margin: 0,
    alignItems: 'flex-start',
  },
  '& .MuiCheckbox-root': {
    padding: '2px 4px 0 0',
  },
  '& .MuiTypography-root': {
    fontSize: '0.75rem',
    color: '#475467',
    lineHeight: 1.45,
  },
}))

export const ContinuePaymentButton = styled(Button)(() => ({
  width: '100%',
  borderRadius: 10,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9375rem',
  minHeight: 48,
  backgroundColor: '#0f4671',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#0d3b61',
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    backgroundColor: '#b8c5d4',
    color: '#ffffff',
  },
}))

export const PaymentSecurityFooter = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  marginTop: 14,
  fontSize: '0.72rem',
  color: '#12b76a',
  textAlign: 'center',
  lineHeight: 1.4,
}))

export const CheckoutSubtitle = styled(Typography)(() => ({
  fontSize: '0.8125rem',
  color: '#667085',
  lineHeight: 1.5,
  marginBottom: 20,
  marginTop: -16,
}))

export const PremiumSummaryCard = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '16px',
  marginBottom: 20,
  backgroundColor: '#e8f4fd',
  borderRadius: 12,
  border: '1px solid #d4e8f7',
}))

export const PremiumSummaryIcon = styled(Box)(() => ({
  width: 52,
  height: 52,
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  color: '#0f4671',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

export const PremiumSummaryContent = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}))

export const PremiumSummaryLabel = styled(Typography)(() => ({
  fontSize: '0.75rem',
  color: '#667085',
  marginBottom: 2,
}))

export const PremiumSummaryAmount = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#0f4671',
  lineHeight: 1.1,
  marginBottom: 4,
}))

export const BillingAddressCard = styled(Box)(() => ({
  border: '1px solid #e8edf2',
  borderRadius: 12,
  padding: '16px',
  marginBottom: 20,
}))

export const BillingAddressHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
}))

export const BillingAddressIcon = styled(Box)(() => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#e8f4fd',
  color: '#0f4671',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

export const BillingAddressMain = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}))

export const BillingAddressTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '0.875rem',
  color: '#0f4671',
  marginBottom: 4,
}))

export const BillingAddressText = styled(Typography)(() => ({
  fontSize: '0.8125rem',
  color: '#0f4671',
  fontWeight: 600,
  lineHeight: 1.45,
  wordBreak: 'break-word',
}))

export const BillingAddressEditButton = styled('button')(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  border: 'none',
  background: 'transparent',
  color: '#0f4671',
  fontSize: '0.75rem',
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  '&:hover': {
    textDecoration: 'underline',
  },
}))

export const BillingAddressHint = styled(Typography)(() => ({
  marginTop: 10,
  fontSize: '0.72rem',
  color: '#667085',
  lineHeight: 1.45,
}))

export const CheckoutPaymentHeader = styled(Box)(() => ({
  backgroundColor: '#0f4671',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '0.9375rem',
  padding: '12px 16px',
  borderRadius: '12px 12px 0 0',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}))

export const CheckoutPaymentBody = styled(Box)(() => ({
  border: '1px solid #e8edf2',
  borderTop: 'none',
  borderRadius: '0 0 12px 12px',
  overflow: 'hidden',
  '& .payment-inline-form': {
    marginTop: 0,
    padding: '16px',
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
  },
}))

export const CheckoutSecurityFooter = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  marginTop: 16,
  fontSize: '0.72rem',
  color: '#667085',
  textAlign: 'center',
  lineHeight: 1.4,
}))
