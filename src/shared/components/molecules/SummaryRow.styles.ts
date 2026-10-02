import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const SummaryRowRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-of-type': {
    borderBottom: 'none',
  },
}))

export const SummaryLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  minWidth: 140,
}))

export const SummaryValue = styled(Box)(() => ({
  textAlign: 'right',
  fontWeight: 600,
  flex: 1,
}))
