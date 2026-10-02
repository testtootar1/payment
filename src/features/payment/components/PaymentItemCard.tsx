import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Checkbox from '@mui/material/Checkbox'
import { LEGACY_LINKS } from '../../../shared/constants/legacyAssets'
import { formatCurrency } from '../../../shared/utils/formatters'
import type { PaymentItem } from '../../../shared/types/paymentInfoApi.types'
import {
  ItemTitle,
  PaymentAmount,
  PaymentItemBody,
  PaymentItemDetails,
  PaymentItemHeader,
  PaymentItemMainRow,
  PaymentItemMeta,
  PaymentItemPaper,
  ViewScheduleLinkDesktop,
  ViewScheduleLinkMobile,
} from '../styles/PaymentSummaryPage.styles'

interface PaymentItemCardProps {
  item: PaymentItem
  selected: boolean
  onToggle: (id: string) => void
}

export function PaymentItemCard({
  item,
  selected,
  onToggle,
}: PaymentItemCardProps) {
  return (
    <PaymentItemPaper selected={selected} elevation={0}>
      <PaymentItemHeader>
        <Checkbox
          checked={selected}
          onChange={(_event, checked) => {
            if (checked !== selected) {
              onToggle(item.id)
            }
          }}
          color="primary"
          aria-label={`Select ${item.description}`}
        />
        <PaymentItemBody>
          <PaymentItemMainRow>
            <ItemTitle>{item.description}</ItemTitle>
            <ViewScheduleLinkDesktop
              href={LEGACY_LINKS.customerPortal}
              target="_blank"
              rel="noreferrer"
            >
              <DescriptionOutlinedIcon fontSize="inherit" />
              [View Schedule]
            </ViewScheduleLinkDesktop>
            <PaymentAmount className="payment-amount--mobile">
              {formatCurrency(item.amount)}
            </PaymentAmount>
          </PaymentItemMainRow>
          <PaymentItemDetails>
            <ViewScheduleLinkMobile
              href={LEGACY_LINKS.customerPortal}
              target="_blank"
              rel="noreferrer"
            >
              <DescriptionOutlinedIcon fontSize="inherit" />
              [View Schedule]
            </ViewScheduleLinkMobile>
            <PaymentItemMeta>Policy: {item.policyNumber}</PaymentItemMeta>
            <PaymentItemMeta>Address: {item.riskAddress}</PaymentItemMeta>
            <PaymentItemMeta>Reference: {item.reference}</PaymentItemMeta>
            <PaymentItemMeta>Due Date: {item.dueDate}</PaymentItemMeta>
          </PaymentItemDetails>
        </PaymentItemBody>
        <PaymentAmount className="payment-amount--desktop">
          {formatCurrency(item.amount)}
        </PaymentAmount>
      </PaymentItemHeader>
    </PaymentItemPaper>
  )
}
