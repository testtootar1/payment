import { Spinner } from 'react-bootstrap'

export function LoadingOverlay() {
  return (
    <div className="loading-main" role="status" aria-live="polite" aria-busy="true">
      <Spinner animation="border" variant="primary" />
      <span className="visually-hidden">Loading…</span>
    </div>
  )
}
