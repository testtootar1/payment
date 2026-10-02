import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/GroupOutlined'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { LoadingOverlay } from '../../../shared/components/atoms/LoadingOverlay'
import { LEGACY_IMAGES } from '../../../shared/constants/legacyAssets'
import { isValidUkPostcodeFormat } from '../../../shared/utils/postcodeValidation'
import {
  PAYMENT_SESSION_TIMEOUT_MS,
  savePaymentSession,
} from '../../../shared/utils/paymentSessionStorage'
import { fetchPaymentInfo } from '../../payment/services/paymentInfoApi'
import { mapPaymentLinkInfo } from '../../payment/utils/mapPaymentInfoApi'
import {
  AuthCard,
  AuthDivider,
  AuthFormRoot,
  AuthLogo,
  AuthPageRoot,
  AuthPortalRow,
  ErrorBanner,
  FieldInput,
  FieldLabel,
  HelpContactItem,
  HelpContacts,
  HelpDivider,
  InputShell,
  LoginButton,
  SslFooter,
  TrustBar,
  TrustItem,
  WelcomeText,
  WelcomeTitle,
} from '../styles/AuthPage.styles'

const SUPPORT_PHONE = '03442740158'
const SUPPORT_EMAIL = 'admin@thamesbankinsurance.co.uk'

function normalizeReference(value: string): string {
  return value.replace(/\s+/g, '').toUpperCase()
}

export function AuthPage() {
  const { referenceNumber = '' } = useParams<{ referenceNumber: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [policyReference, setPolicyReference] = useState(() =>
    normalizeReference(referenceNumber),
  )
  const [postcode, setPostcode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const displayReference = normalizeReference(policyReference)
  const hasReference = Boolean(displayReference)

  useEffect(() => {
    setPolicyReference(normalizeReference(referenceNumber))
  }, [referenceNumber])

  useEffect(() => {
    const state = location.state as { sessionExpired?: boolean } | null
    if (!state?.sessionExpired) {
      return
    }

    setError(
      'Your session has expired for security. Please confirm your details again.',
    )
    navigate(location.pathname, { replace: true, state: null })
  }, [location.pathname, location.state, navigate])

  const handleReferenceChange = (value: string) => {
    const next = normalizeReference(value)
    setPolicyReference(next)
    setError(null)

    if (next) {
      navigate(`/${next}`, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!hasReference) {
      setError('Please enter your policy reference.')
      return
    }

    if (!isValidUkPostcodeFormat(postcode)) {
      setError('Please enter a valid UK postcode.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetchPaymentInfo(displayReference, postcode)
      const paymentInfo = mapPaymentLinkInfo(
        response.customer_data,
        response.payment_details,
        displayReference,
        postcode,
      )

      savePaymentSession({
        paymentInfo,
        referenceNumber: displayReference,
        validatedPostcode: postcode.trim().toUpperCase(),
        expiresAt: Date.now() + PAYMENT_SESSION_TIMEOUT_MS,
      })

      navigate(`/${displayReference}/summary`)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to verify your details. Please try again.'
      setError(
        message.includes('Unable to load') || message.includes('failed')
          ? 'We could not match this policy reference and postcode. Please check and try again.'
          : message,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isSubmitting ? <LoadingOverlay /> : null}
      <AuthPageRoot>
        <AuthCard>
          <AuthLogo src={LEGACY_IMAGES.loginLogo} alt="Thamesbank logo" />
          <AuthPortalRow>
            <ShieldOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Online Payment Portal</span>
          </AuthPortalRow>
          <AuthDivider />

          <WelcomeTitle>Confirm your details</WelcomeTitle>
          <WelcomeText>
            To keep your payment secure, please confirm the postcode for the
            insured property.
          </WelcomeText>

          <AuthFormRoot onSubmit={(event) => void handleSubmit(event)}>
            {error ? <ErrorBanner role="alert">{error}</ErrorBanner> : null}

            <div>
              <FieldLabel htmlFor="policy-reference">Policy Reference</FieldLabel>
              <InputShell>
                <DescriptionOutlinedIcon
                  sx={{ fontSize: 20, color: '#667085', flexShrink: 0 }}
                />
                <FieldInput
                  id="policy-reference"
                  type="text"
                  placeholder="Enter your policy reference"
                  value={policyReference}
                  onChange={(event) => handleReferenceChange(event.target.value)}
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  aria-label="Policy Reference"
                  required
                />
                {hasReference ? (
                  <CheckCircleIcon
                    sx={{ fontSize: 22, color: '#12b76a', flexShrink: 0 }}
                    aria-label="Reference entered"
                  />
                ) : null}
              </InputShell>
            </div>

            <div>
              <FieldLabel htmlFor="risk-postcode">Risk Postcode</FieldLabel>
              <InputShell>
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 20, color: '#667085', flexShrink: 0 }}
                />
                <FieldInput
                  id="risk-postcode"
                  type="text"
                  placeholder="Enter your risk postcode"
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                  autoComplete="postal-code"
                  required
                />
              </InputShell>
            </div>

            <LoginButton
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              disabled={isSubmitting || !hasReference}
              startIcon={<LockOutlinedIcon />}
            >
              Continue to payment
            </LoginButton>
            <TrustBar>
              <TrustItem>
                <ShieldOutlinedIcon
                  sx={{ fontSize: 14, color: '#0f4671', flexShrink: 0 }}
                />
                <span>Secure and encrypted</span>
              </TrustItem>
              <TrustItem>
                <LockOutlinedIcon
                  sx={{ fontSize: 14, color: '#0f4671', flexShrink: 0 }}
                />
                <span>Your data is protected</span>
              </TrustItem>
              <TrustItem>
                <VerifiedUserOutlinedIcon
                  sx={{ fontSize: 14, color: '#0f4671', flexShrink: 0 }}
                />
                <span>Trusted by thousands</span>
              </TrustItem>
            </TrustBar>
          </AuthFormRoot>

          <HelpDivider>Need help?</HelpDivider>

          <HelpContacts>
            <HelpContactItem>
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: '#0f4671' }} />
              <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}>
                {SUPPORT_PHONE}
              </a>
            </HelpContactItem>
            <HelpContactItem>
              <EmailOutlinedIcon sx={{ fontSize: 18, color: '#0f4671' }} />
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </HelpContactItem>
          </HelpContacts>

          <SslFooter>
            <LockOutlinedIcon sx={{ fontSize: 14 }} />
            <span>This site is protected by 256-bit SSL encryption.</span>
          </SslFooter>
        </AuthCard>
      </AuthPageRoot>
    </>
  )
}
