import type { ReactNode } from 'react'
import { LegacyFooter } from '../components/organisms/LegacyFooter'
import { LegacyHeader } from '../components/organisms/LegacyHeader'

interface LegacyPageShellProps {
  children: ReactNode
}

export function LegacyPageShell({ children }: LegacyPageShellProps) {
  return (
    <div className="page-main-area">
      <LegacyHeader />
      {children}
      <LegacyFooter />
    </div>
  )
}
