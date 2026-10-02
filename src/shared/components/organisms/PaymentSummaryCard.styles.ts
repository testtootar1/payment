import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const SummaryCardRoot = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

export const TotalAmountBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))
