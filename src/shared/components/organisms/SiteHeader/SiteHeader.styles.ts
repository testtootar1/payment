import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { BRAND_COLORS, HEADER_LAYOUT } from '../../../constants/branding'

export const HEADER_HEIGHT = HEADER_LAYOUT.logoHeight + 32

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#ffffff',
  color: BRAND_COLORS.textDark,
  borderBottom: '1px solid #e5e9ef',
  boxShadow: 'none',
}))

export const HeaderToolbar = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  minHeight: HEADER_HEIGHT,
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}))

export const LogoSection = styled(Box)(() => ({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
}))

export const LogoButton = styled('button')(() => ({
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  '&:focus-visible': {
    outline: `2px solid ${BRAND_COLORS.blue}`,
    outlineOffset: 2,
    borderRadius: 4,
  },
}))

export const LogoImage = styled('img')(({ theme }) => ({
  height: HEADER_LAYOUT.logoHeight,
  width: 'auto',
  maxWidth: 200,
  objectFit: 'contain',
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    height: 42,
    maxWidth: 160,
  },
}))

export const ContactSection = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: theme.spacing(0.25),
  marginLeft: 'auto',
}))

export const HelpRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
}))

export const HelpIconImage = styled('img')(() => ({
  width: 24,
  height: 24,
  objectFit: 'contain',
  display: 'block',
}))

export const HelpLabel = styled(Typography)(() => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: BRAND_COLORS.textDark,
  lineHeight: 1.2,
}))

export const PhoneLink = styled(Link)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  color: BRAND_COLORS.textDark,
  fontWeight: 700,
  fontSize: '1.125rem',
  textDecoration: 'none',
  lineHeight: 1.2,
  '&:hover': {
    color: BRAND_COLORS.blue,
    textDecoration: 'underline',
  },
}))

export const HoursText = styled(Typography)(() => ({
  fontSize: '0.75rem',
  color: BRAND_COLORS.textMuted,
  lineHeight: 1.2,
}))

export const HeaderSpacer = styled(Box)(() => ({
  height: HEADER_HEIGHT,
  flexShrink: 0,
}))
