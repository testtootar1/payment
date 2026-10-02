import Typography from '@mui/material/Typography'
import { SummaryLabel, SummaryRowRoot, SummaryValue } from './SummaryRow.styles'

interface SummaryRowProps {
  label: string
  value: string
}

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <SummaryRowRoot>
      <SummaryLabel>
        <Typography variant="body2">{label}</Typography>
      </SummaryLabel>
      <SummaryValue>
        <Typography variant="body1">{value}</Typography>
      </SummaryValue>
    </SummaryRowRoot>
  )
}
