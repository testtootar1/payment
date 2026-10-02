import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export const AuthPageRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  position: 'relative',
  zIndex: 0,
  backgroundColor: '#000000',
  padding: '24px 16px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/images/legacy/bg.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: -1,
    opacity: 0.4,
  },
  [theme.breakpoints.down('md')]: {
    padding: 15,
  },
}))

export const AuthCard = styled(Box)(() => ({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: 520,
  backgroundColor: '#ffffff',
  borderRadius: 16,
  boxShadow: '0 8px 30px rgba(15, 70, 113, 0.08)',
  border: '1px solid #e8edf2',
  padding: '32px 36px 28px',
  textAlign: 'center',
}))

export const AuthLogo = styled('img')(() => ({
  display: 'block',
  maxWidth: 200,
  width: '100%',
  height: 'auto',
  margin: '0 auto 16px',
}))

export const AuthPortalRow = styled(Box)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  color: '#0f4671',
  fontSize: '0.875rem',
  fontWeight: 500,
  marginBottom: 16,
}))

export const AuthDivider = styled(Box)(() => ({
  height: 1,
  backgroundColor: '#e5e7eb',
  marginBottom: 15,
}))

export const WelcomeTitle = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: '1.5rem',
  color: '#0f4671',
  marginBottom: 10,
  // textAlign: 'left',
}))

export const WelcomeText = styled(Typography)(() => ({
  fontSize: '13px',
  color: '#667085',
  lineHeight: 1.55,
  marginBottom: 15,
  // textAlign: 'left',
}))

export const AuthFormRoot = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  textAlign: 'left',
}))

export const FieldLabel = styled('label')(() => ({
  display: 'block',
  fontWeight: 600,
  fontSize: '0.875rem',
  color: '#0f4671',
  marginBottom: 8,
}))

export const InputShell = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  minHeight: 48,
  padding: '0 14px',
  borderRadius: 10,
  border: '1px solid #d8dee6',
  backgroundColor: '#ffffff',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  '&:focus-within': {
    borderColor: '#0f4671',
    boxShadow: '0 0 0 3px rgba(15, 70, 113, 0.12)',
  },
}))

export const InputShellReadOnly = styled(InputShell)(() => ({
  backgroundColor: '#f9fafb',
}))

export const FieldInput = styled('input')(() => ({
  flex: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontSize: '0.9rem',
  color: '#22242f',
  fontFamily: 'inherit',
  '&::placeholder': {
    color: '#98a2b3',
  },
  '&:read-only': {
    color: '#344054',
    cursor: 'default',
  },
}))

export const TrustBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 8px',
  borderRadius: 10,
  backgroundColor: '#f3f7fb',
  border: '1px solid #e8eef5',
  [theme.breakpoints.up('sm')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
    padding: '14px 12px',
  },
}))

export const TrustItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flex: 1,
  minWidth: 0,
  color: '#0f4671',
  fontSize: '11px',
  fontWeight: 500,
  lineHeight: 1.25,
  textAlign: 'left',
  padding: '0 6px',
  '&:not(:last-child)': {
    borderRight: '1px solid #d0dae6',
  },
  '& span': {
    minWidth: 0,
  },
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
    gap: 6,
    flex: 'unset',
    color: '#475467',
    fontSize: '0.72rem',
    fontWeight: 400,
    lineHeight: 1.3,
    padding: 0,
    '&:not(:last-child)': {
      borderRight: 'none',
    },
  },
}))

export const LoginButton = styled(Button)(() => ({
  marginTop: 4,
  minHeight: 48,
  borderRadius: 10,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
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

export const HelpDivider = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  margin: '8px 0 16px',
  color: '#98a2b3',
  fontSize: '0.8rem',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
}))

export const HelpText = styled(Typography)(() => ({
  fontSize: '0.8rem',
  color: '#667085',
  lineHeight: 1.5,
  marginBottom: 14,
  textAlign: 'center',
}))

export const HelpContacts = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
  marginBottom: 18,
  [theme.breakpoints.up('sm')]: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyItems: 'start',
    gridAutoFlow: 'row',
  },
}))

export const HelpContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  fontSize: '11px',
  color: '#344054',
  [theme.breakpoints.up('sm')]: {
    gap: 8,
    fontSize: '0.8rem',
  },
  '& a': {
    color: '#0f4671',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export const SslFooter = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  fontSize: '0.72rem',
  color: '#98a2b3',
  paddingTop: 4,
}))

export const ErrorBanner = styled(Box)(() => ({
  padding: '10px 12px',
  borderRadius: 8,
  backgroundColor: '#fef3f2',
  border: '1px solid #fecdca',
  color: '#b42318',
  fontSize: '0.85rem',
  lineHeight: 1.45,
}))
