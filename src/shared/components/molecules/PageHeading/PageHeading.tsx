import { parsePageSubtitle } from '../../../constants/paymentFlow'
import {
  PageHeadingRoot,
  PageHeadingStepLine,
  PageHeadingTitle,
  StepBadge,
  StepDescription,
} from './PageHeading.styles'

interface PageHeadingProps {
  title?: string
  subtitle?: string
}

export function PageHeading({
  title = 'Thames Bank Insurance Portal',
  subtitle,
}: PageHeadingProps) {
  if (!subtitle) {
    return (
      <PageHeadingRoot>
        <PageHeadingTitle>{title}</PageHeadingTitle>
      </PageHeadingRoot>
    )
  }

  const { stepText, label } = parsePageSubtitle(subtitle)

  return (
    <PageHeadingRoot>
      <PageHeadingTitle>{title}</PageHeadingTitle>
      <PageHeadingStepLine>
        <StepBadge>Step {stepText}</StepBadge>
        <StepDescription>{label}</StepDescription>
      </PageHeadingStepLine>
    </PageHeadingRoot>
  )
}
