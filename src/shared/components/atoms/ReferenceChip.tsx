import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ReferenceChipRoot } from './ReferenceChip.styles'

interface ReferenceChipProps {
  referenceNumber: string
  label?: string
}

export function ReferenceChip({
  referenceNumber,
  label = 'Client Reference',
}: ReferenceChipProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <ReferenceChipRoot label={referenceNumber} color="primary" variant="outlined" />
    </Box>
  )
}
