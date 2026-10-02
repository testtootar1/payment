import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { BRAND_COLORS } from '../constants/branding'

const CONTENT_MAX = 720

export const PageRoot = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: BRAND_COLORS.pageBg,
}))

export const PageMain = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 1152,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: theme.spacing(4, 3, 5),
  gap: theme.spacing(2.5),
  boxSizing: 'border-box',
}))

export const ContentCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: CONTENT_MAX,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1.5),
  boxShadow: '0 2px 12px rgba(0, 51, 102, 0.08)',
}))

export const PageFooter = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
}))
