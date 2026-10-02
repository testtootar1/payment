import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../features/auth/pages/AuthPage'
import { PaymentFailedPage } from '../features/payment/pages/PaymentFailedPage'
import { PaymentSuccessPage } from '../features/payment/pages/PaymentSuccessPage'
import { PaymentSummaryPage } from '../features/payment/pages/PaymentSummaryPage'
import { ROUTES } from '../shared/constants/paymentGateway'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.paymentSuccess} element={<PaymentSuccessPage />} />
      <Route path={ROUTES.paymentFailed} element={<PaymentFailedPage />} />
      <Route path="/:referenceNumber/summary" element={<PaymentSummaryPage />} />
      <Route path="/:referenceNumber?" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
