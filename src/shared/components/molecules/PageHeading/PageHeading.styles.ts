import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { BRAND_COLORS } from '../../../constants/branding'

const CONTENT_MAX = 720

export const PageHeadingRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: CONTENT_MAX,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.75),
}))

export const PageHeadingTitle = styled('h1')(({ theme }) => ({
  margin: 0,
  fontSize: theme.typography.pxToRem(28),
  fontWeight: 600,
  color: BRAND_COLORS.navy,
  lineHeight: 1.25,
}))

export const PageHeadingStepLine = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
}))

export const StepBadge = styled('span')(({ theme }) => ({
  display: 'inline-block',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '#ffffff',
  backgroundColor: BRAND_COLORS.blue,
  padding: theme.spacing(0.35, 1.25),
  borderRadius: 4,
}))

export const StepDescription = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  fontWeight: 500,
  color: BRAND_COLORS.textMuted,
}))
