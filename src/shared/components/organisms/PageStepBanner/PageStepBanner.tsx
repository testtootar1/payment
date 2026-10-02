import { Fragment } from 'react'
import { PAYMENT_FLOW_STEPS } from '../../../constants/paymentFlow'
import {
  StepBannerInner,
  StepBannerRoot,
  StepConnector,
  StepItem,
  StepLabel,
  StepsRow,
} from './PageStepBanner.styles'

interface PageStepBannerProps {
  activeStep: number
}

export function PageStepBanner({ activeStep }: PageStepBannerProps) {
  return (
    <StepBannerRoot>
      <StepBannerInner>
        <StepsRow aria-label="Payment progress">
          {PAYMENT_FLOW_STEPS.map((step, index) => {
            const isActive = step.id === activeStep
            const isCompleted = step.id < activeStep
            const isLast = index === PAYMENT_FLOW_STEPS.length - 1

            return (
              <Fragment key={step.id}>
                <StepItem>
                  <StepLabel $active={isActive} $completed={isCompleted}>
                    {step.label}
                  </StepLabel>
                </StepItem>
                {!isLast && (
                  <StepConnector $filled={isCompleted || isActive} aria-hidden />
                )}
              </Fragment>
            )
          })}
        </StepsRow>
      </StepBannerInner>
    </StepBannerRoot>
  )
}
