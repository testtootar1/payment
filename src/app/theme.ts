import { createTheme } from '@mui/material/styles'
import { BRAND_COLORS } from '../shared/constants/branding'

export const appTheme = createTheme({
  palette: {
    primary: {
      main: BRAND_COLORS.navy,
      light: '#e8f1f8',
      dark: '#002244',
      contrastText: '#ffffff',
    },
    secondary: {
      main: BRAND_COLORS.blue,
    },
    success: {
      main: BRAND_COLORS.lime,
    },
    background: {
      default: BRAND_COLORS.pageBg,
      paper: '#ffffff',
    },
    text: {
      primary: BRAND_COLORS.textDark,
      secondary: BRAND_COLORS.textMuted,
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
})
