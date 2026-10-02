import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import { BRAND_COLORS } from '../../constants/branding'

export const ReferenceChipRoot = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(14),
  letterSpacing: '0.06em',
  height: 32,
  borderRadius: 20,
  borderColor: BRAND_COLORS.navy,
  color: BRAND_COLORS.navy,
  backgroundColor: '#ffffff',
  '& .MuiChip-label': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))
