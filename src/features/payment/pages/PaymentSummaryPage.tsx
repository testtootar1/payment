import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LegacyPageShell } from '../../../shared/layout/LegacyPageShell'
import type {
  CustomerSummary,
  PaymentItem,
} from '../../../shared/types/paymentInfoApi.types'
import type { PaymentLinkInfo } from '../../../shared/types/payment.types'
import {
  clearPaymentSession,
  consumeRetryPaymentIntent,
  loadPaymentSession,
  savePaymentSession,
} from '../../../shared/utils/paymentSessionStorage'
import { formatCurrency } from '../../../shared/utils/formatters'
import { InlinePaymentForm } from '../components/InlinePaymentForm'
import { PaymentCheckoutSidebar } from '../components/PaymentCheckoutSidebar'
import { PendingPaymentsSection } from '../components/PendingPaymentsSection'
import { fetchPaymentInfo } from '../services/paymentInfoApi'
import { useRealexHpp } from '../hooks/useRealexHpp'
import {
  mapCustomerSummary,
  mapPaymentItems,
} from '../utils/mapPaymentInfoApi'
import { resolvePaymentAddress } from '../utils/resolvePaymentAddress'
import type { AddressUpdateChoice } from '../components/PaymentAddressUpdate'
import type { EditableAddressLines } from '../utils/resolvePaymentAddress'
import {
  AlertSpacing,
  SummaryGridContainer,
  SummaryLeftColumn,
  SummaryPageRoot,
} from '../styles/PaymentSummaryPage.styles'

function buildPaymentDescription(items: PaymentItem[], selectedIds: string[]): string {
  return items
    .filter((item) => selectedIds.includes(item.id))
    .map((item) => item.description)
    .join('; ')
}

function fallbackCustomer(session: {
  referenceNumber: string
  validatedPostcode: string
  paymentInfo: PaymentLinkInfo
}): CustomerSummary {
  const parts = session.paymentInfo.riskAddress
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  return {
    name: session.paymentInfo.clientName,
    reference: session.paymentInfo.clientReference,
    address: session.paymentInfo.riskAddress,
    policyNumber: session.paymentInfo.policyNumber,
    phone: '',
    email: session.paymentInfo.clientEmail,
    addressLines: {
      line1: parts[0] ?? '',
      line2: parts[1] ?? '',
      line3: parts[2] ?? '',
      postcode: session.validatedPostcode,
    },
  }
}

export function PaymentSummaryPage() {
  const { referenceNumber = '' } = useParams<{ referenceNumber: string }>()
  const navigate = useNavigate()
  const [session, setSession] = useState(() => loadPaymentSession())
  const sessionRef = session?.referenceNumber ?? ''
  const sessionPostcode = session?.validatedPostcode ?? ''
  const hasValidSession =
    Boolean(session) &&
    session?.referenceNumber === referenceNumber.toUpperCase()

  const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [customerSummary, setCustomerSummary] = useState<CustomerSummary | null>(
    null,
  )
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [formSessionKey, setFormSessionKey] = useState(0)
  const paymentSectionRef = useRef<HTMLDivElement>(null)
  const [addressChoice, setAddressChoice] = useState<AddressUpdateChoice>('no')
  const [addressLines, setAddressLines] = useState<EditableAddressLines>({
    line1: '',
    line2: '',
    line3: '',
  })

  const { isReady, error, isFormLoading, activateEmbeddedForm, onIframeLoad } =
    useRealexHpp(hasValidSession && showPaymentForm, formSessionKey)

  const sessionExpiredRef = useRef(false)

  useEffect(() => {
    if (hasValidSession) {
      return
    }

    navigate(`/${referenceNumber}`, {
      replace: true,
      state: sessionExpiredRef.current ? { sessionExpired: true } : null,
    })
    sessionExpiredRef.current = false
  }, [hasValidSession, navigate, referenceNumber])

  useEffect(() => {
    if (!session?.expiresAt) {
      return
    }

    const expireSession = () => {
      sessionExpiredRef.current = true
      clearPaymentSession()
      setSession(null)
    }

    if (Date.now() >= session.expiresAt) {
      expireSession()
      return
    }

    const intervalId = window.setInterval(() => {
      if (Date.now() >= session.expiresAt) {
        expireSession()
      }
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [session?.expiresAt])

  useEffect(() => {
    if (consumeRetryPaymentIntent()) {
      setShowPaymentForm(true)
      setFormSessionKey(Date.now())
    }
  }, [])

  useEffect(() => {
    if (!sessionRef || !sessionPostcode) {
      return
    }

    let cancelled = false

    async function loadPaymentData() {
      setIsLoadingData(true)
      setLoadError(null)

      try {
        const response = await fetchPaymentInfo(sessionRef, sessionPostcode)

        if (cancelled) {
          return
        }

        const items = mapPaymentItems(
          response.customer_data,
          response.payment_details,
        )
        setPaymentItems(items)
        setSelectedIds(items.map((item) => item.id))
        setCustomerSummary(
          mapCustomerSummary(response.customer_data, sessionRef),
        )
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : 'Unable to load payment information.'
          setLoadError(message)
          setPaymentItems([])
          setSelectedIds([])
          if (session) {
            setCustomerSummary(fallbackCustomer(session))
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoadingData(false)
        }
      }
    }

    void loadPaymentData()

    return () => {
      cancelled = true
    }
  }, [sessionRef, sessionPostcode])

  const displayCustomer = customerSummary ?? (session ? fallbackCustomer(session) : null)

  useEffect(() => {
    if (!displayCustomer) {
      return
    }

    setAddressLines({
      line1: displayCustomer.addressLines.line1,
      line2: displayCustomer.addressLines.line2,
      line3: displayCustomer.addressLines.line3,
    })
  }, [displayCustomer?.address])

  const handleAddressChoiceChange = useCallback(
    (choice: AddressUpdateChoice) => {
      setAddressChoice(choice)
      if (choice === 'yes') {
        return
      }

      if (displayCustomer) {
        setAddressLines({
          line1: displayCustomer.addressLines.line1,
          line2: displayCustomer.addressLines.line2,
          line3: displayCustomer.addressLines.line3,
        })
      }
    },
    [displayCustomer],
  )

  const handleAddressLineChange = useCallback(
    (field: keyof EditableAddressLines, value: string) => {
      setAddressLines((current) => ({ ...current, [field]: value }))
    },
    [],
  )

  const paymentAddress = useMemo(() => {
    if (!displayCustomer) {
      return ''
    }

    return resolvePaymentAddress({
      defaultAddress: displayCustomer.address,
      defaultLines: displayCustomer.addressLines,
      choice: addressChoice,
      editedLines: addressLines,
    })
  }, [displayCustomer, addressChoice, addressLines])

  const subtotal = useMemo(() => {
    return paymentItems
      .filter((item) => selectedIds.includes(item.id))
      .reduce((sum, item) => sum + item.amount, 0)
  }, [paymentItems, selectedIds])

  const handleToggleItem = useCallback((id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    )
  }, [])

  const persistSessionForPayment = useCallback(() => {
    if (!session) {
      return
    }

    const selectedItems = paymentItems.filter((item) =>
      selectedIds.includes(item.id),
    )
    const updatedInfo: PaymentLinkInfo = {
      ...session.paymentInfo,
      totalAmount: subtotal,
      paymentDescription: buildPaymentDescription(paymentItems, selectedIds),
      clientReference:
        selectedItems[0]?.reference ?? session.paymentInfo.clientReference,
      policyNumber:
        selectedItems[0]?.policyNumber ?? session.paymentInfo.policyNumber,
      riskAddress: paymentAddress,
      clientName: customerSummary?.name ?? session.paymentInfo.clientName,
      clientEmail: customerSummary?.email ?? session.paymentInfo.clientEmail,
    }

    const nextSession = {
      ...session,
      paymentInfo: updatedInfo,
    }
    savePaymentSession(nextSession)
    setSession(nextSession)
  }, [
    session,
    paymentItems,
    selectedIds,
    subtotal,
    customerSummary,
    paymentAddress,
  ])

  const handlePaySecurely = () => {
    persistSessionForPayment()
    setShowPaymentForm(true)
    setFormSessionKey(Date.now())
  }

  useEffect(() => {
    if (!showPaymentForm) {
      return
    }

    const frameId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    })

    return () => cancelAnimationFrame(frameId)
  }, [showPaymentForm, formSessionKey])

  useEffect(() => {
    if (!showPaymentForm || !session) {
      return
    }

    if (session.paymentInfo.riskAddress === paymentAddress) {
      return
    }

    const selectedItems = paymentItems.filter((item) =>
      selectedIds.includes(item.id),
    )
    const updatedInfo: PaymentLinkInfo = {
      ...session.paymentInfo,
      totalAmount: subtotal,
      paymentDescription: buildPaymentDescription(paymentItems, selectedIds),
      clientReference:
        selectedItems[0]?.reference ?? session.paymentInfo.clientReference,
      policyNumber:
        selectedItems[0]?.policyNumber ?? session.paymentInfo.policyNumber,
      riskAddress: paymentAddress,
      clientName: customerSummary?.name ?? session.paymentInfo.clientName,
      clientEmail: customerSummary?.email ?? session.paymentInfo.clientEmail,
    }

    savePaymentSession({
      ...session,
      paymentInfo: updatedInfo,
    })
  }, [
    showPaymentForm,
    paymentAddress,
    session,
    paymentItems,
    selectedIds,
    subtotal,
    customerSummary,
  ])

  if (!session) {
    return null
  }

  const hasSelection = selectedIds.length > 0 && subtotal > 0
  const payDisabled = !hasSelection || isLoadingData || Boolean(loadError)

  const inlineFormLoading = showPaymentForm && (isFormLoading || !isReady)
  const showContent = !isLoadingData && !loadError
  const totalFormatted = formatCurrency(subtotal, session.paymentInfo.currency)

  return (
    <LegacyPageShell>
      <SummaryPageRoot>
        <Container maxWidth="lg">
          {isLoadingData ? (
            <CircularProgress aria-label="Loading payment details" />
          ) : null}

          {loadError ? (
            <AlertSpacing>
              <Alert severity="error">{loadError}</Alert>
            </AlertSpacing>
          ) : null}

          {showContent ? (
            <SummaryGridContainer>
              {displayCustomer ? (
                <SummaryLeftColumn>
                  <PendingPaymentsSection
                    paymentItems={paymentItems}
                    selectedIds={selectedIds}
                    onToggleItem={handleToggleItem}
                    addressChoice={addressChoice}
                    addressLines={addressLines}
                    defaultAddressLines={displayCustomer.addressLines}
                    onAddressChoiceChange={handleAddressChoiceChange}
                    onAddressLineChange={handleAddressLineChange}
                    customerName={displayCustomer.name}
                    riskAddress={displayCustomer.address}
                    billingAddress={paymentAddress}
                    policyNumber={displayCustomer.policyNumber}
                    totalFormatted={totalFormatted}
                    onPaySecurely={handlePaySecurely}
                    payDisabled={payDisabled}
                    showPaymentForm={showPaymentForm}
                    paymentSectionRef={paymentSectionRef}
                    paymentError={showPaymentForm ? error : null}
                    paymentForm={
                      showPaymentForm ? (
                        <InlinePaymentForm
                          key={formSessionKey}
                          isLoading={inlineFormLoading}
                          gatewayReady={isReady}
                          onActivate={activateEmbeddedForm}
                          onIframeLoad={onIframeLoad}
                        />
                      ) : null
                    }
                  />
                </SummaryLeftColumn>
              ) : null}

              {displayCustomer ? (
                <PaymentCheckoutSidebar
                  customer={{
                    ...displayCustomer,
                    address: paymentAddress,
                  }}
                  itemsSelected={selectedIds.length}
                  subtotal={subtotal}
                  currency={session.paymentInfo.currency}
                />
              ) : null}
            </SummaryGridContainer>
          ) : null}
        </Container>
      </SummaryPageRoot>
    </LegacyPageShell>
  )
}
