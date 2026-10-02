import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { BRAND_COLORS } from '../../../constants/branding'

export const StepBannerRoot = styled(Box)(() => ({
  width: '100%',
  backgroundColor: BRAND_COLORS.navy,
}))

export const StepBannerInner = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1152,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: theme.spacing(2, 3),
  boxSizing: 'border-box',
}))

export const StepsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(1),
  },
}))

export const StepItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  position: 'relative',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    paddingLeft: theme.spacing(1),
  },
}))

export const StepConnector = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$filled',
})<{ $filled?: boolean }>(({ theme, $filled }) => ({
  flex: 1,
  height: 2,
  minWidth: 24,
  marginTop: theme.spacing(1.25),
  backgroundColor: $filled ? BRAND_COLORS.sky : 'rgba(255, 255, 255, 0.35)',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

export const StepLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$active' && prop !== '$completed',
})<{ $active?: boolean; $completed?: boolean }>(
  ({ $active, $completed }) => ({
    fontSize: '0.75rem',
    fontWeight: $active ? 700 : 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: $active
      ? '#ffffff'
      : $completed
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(255, 255, 255, 0.65)',
    textAlign: 'center',
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
  }),
)
