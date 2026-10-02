import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { parsePageSubtitle } from '../constants/paymentFlow'
import { PageHeading } from '../components/molecules/PageHeading'
import { HeaderSpacer, SiteHeader } from '../components/organisms/SiteHeader'
import { PageStepBanner } from '../components/organisms/PageStepBanner'
import {
  ContentCard,
  PageFooter,
  PageMain,
  PageRoot,
} from '../styles/layout.styles'

interface PageLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function PageLayout({
  children,
  title = 'Thames Bank Insurance Portal',
  subtitle,
}: PageLayoutProps) {
  const activeStep = subtitle ? parsePageSubtitle(subtitle).activeStep : undefined

  return (
    <PageRoot>
      <SiteHeader />
      <HeaderSpacer />
      {activeStep !== undefined && <PageStepBanner activeStep={activeStep} />}
      <PageMain>
        <PageHeading title={title} subtitle={subtitle} />
        <ContentCard elevation={0}>{children}</ContentCard>
      </PageMain>
      <PageFooter>
        <Typography variant="caption">
        Thamesbank Insurance Services, Myinsurer.co.uk, Homeinsurer.co.uk, Tradeinsurer.co.uk, Quoteyourhome.co.uk, Driveinsurance.co.uk, and Quoteyourmotor.com are trading styles of Paragon Car Ltd. Paragon Car Ltd is authorised and regulated by the Financial Conduct Authority No 312028. Registered at Jupiter House, Orbital One, Green Street Green Road, Dartford, Kent, DA1 1QG. Company number 04133312.
        </Typography>
      </PageFooter>
    </PageRoot>
  )
}
