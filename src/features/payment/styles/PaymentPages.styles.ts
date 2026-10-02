import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const PaymentPageActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
}))

export const HiddenPayTrigger = styled('button')(() => ({
  display: 'none',
}))

export const StatusIconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}))

export const AlertSpacing = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))
