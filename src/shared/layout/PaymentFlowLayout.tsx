import type { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { LegacyFooter } from '../components/organisms/LegacyFooter'
import { LegacyHeader } from '../components/organisms/LegacyHeader'
import { PaymentSidebar } from '../components/organisms/PaymentSidebar'
import type { PaymentLinkInfo } from '../types/payment.types'

interface PaymentFlowLayoutProps {
  children: ReactNode
  paymentInfo: PaymentLinkInfo
  referenceNumber: string
}

export function PaymentFlowLayout({
  children,
  paymentInfo,
  referenceNumber,
}: PaymentFlowLayoutProps) {
  return (
    <div className="page-main-area">
      <LegacyHeader />
      <div className="product-page-main-area mt-4">
        <Container fluid>
          <Container>
            <Row className="payment-flow-row g-4">
              <Col xs={12} lg={8} md={7} className="payment-flow-main">
                {children}
              </Col>
              <Col xs={12} lg={4} md={5} className="payment-flow-sidebar">
                <PaymentSidebar
                  paymentInfo={paymentInfo}
                  referenceNumber={referenceNumber}
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
      <LegacyFooter />
    </div>
  )
}
