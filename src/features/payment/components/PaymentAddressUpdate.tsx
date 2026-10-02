import TextField from '@mui/material/TextField'
import type { CustomerAddressLines } from '../../../shared/types/paymentInfoApi.types'
import type { EditableAddressLines } from '../utils/resolvePaymentAddress'
import {
  AddressChoiceButton,
  AddressChoiceRow,
  AddressFieldsBox,
  AddressFieldsColumn,
  AddressFieldsInputs,
  AddressFieldsLabel,
  AddressFieldsRow,
  AddressUpdateCard,
  AddressUpdateQuestion,
} from '../styles/PaymentSummaryPage.styles'

export type AddressUpdateChoice = 'no' | 'yes'

interface PaymentAddressUpdateProps {
  choice: AddressUpdateChoice
  lines: EditableAddressLines
  defaultLines: CustomerAddressLines
  onChoiceChange: (choice: AddressUpdateChoice) => void
  onLineChange: (field: keyof EditableAddressLines, value: string) => void
  showChoiceControls?: boolean
}

export function PaymentAddressUpdate({
  choice,
  lines,
  defaultLines,
  onChoiceChange,
  onLineChange,
  showChoiceControls = true,
}: PaymentAddressUpdateProps) {
  return (
    <AddressUpdateCard elevation={0}>
      {showChoiceControls ? (
        <>
          <AddressUpdateQuestion>
            Do you want to use a different address for this payment?
          </AddressUpdateQuestion>

          <AddressChoiceRow>
            <AddressChoiceButton
              type="button"
              active={choice === 'yes'}
              onClick={() => onChoiceChange('yes')}
            >
              Yes
            </AddressChoiceButton>
            <AddressChoiceButton
              type="button"
              active={choice === 'no'}
              onClick={() => onChoiceChange('no')}
            >
              No
            </AddressChoiceButton>
          </AddressChoiceRow>
        </>
      ) : null}

      {choice === 'yes' ? (
        <AddressFieldsBox>
          <AddressFieldsRow>
            <AddressFieldsColumn>
              <AddressFieldsLabel>Address:</AddressFieldsLabel>
              <AddressFieldsInputs>
                <TextField
                  size="small"
                  fullWidth
                  value={lines.line1}
                  placeholder={defaultLines.line1 || 'Address line 1'}
                  onChange={(event) => onLineChange('line1', event.target.value)}
                />
                <TextField
                  size="small"
                  fullWidth
                  value={lines.line2}
                  placeholder={defaultLines.line2 || 'Address line 2'}
                  onChange={(event) => onLineChange('line2', event.target.value)}
                />
                <TextField
                  size="small"
                  fullWidth
                  value={lines.line3}
                  placeholder={defaultLines.line3 || 'Address line 3'}
                  onChange={(event) => onLineChange('line3', event.target.value)}
                />
              </AddressFieldsInputs>
            </AddressFieldsColumn>
          </AddressFieldsRow>
        </AddressFieldsBox>
      ) : null}
    </AddressUpdateCard>
  )
}
