import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import { RouteTransitionLoader } from '../../shared/components/atoms/RouteTransitionLoader'
import { appTheme } from '../theme'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <RouteTransitionLoader />
        {children}
      </BrowserRouter>
    </ThemeProvider>
  )
}
