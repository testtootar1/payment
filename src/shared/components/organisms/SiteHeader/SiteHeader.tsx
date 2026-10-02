import PhoneIcon from '@mui/icons-material/Phone'
import { BRANDING } from '../../../constants/branding'
import {
  ContactSection,
  HeaderSpacer,
  HeaderToolbar,
  HelpIconImage,
  HelpLabel,
  HelpRow,
  HoursText,
  LogoButton,
  LogoImage,
  LogoSection,
  PhoneLink,
  StyledAppBar,
} from './SiteHeader.styles'

export function SiteHeader() {
  return (
    <StyledAppBar position="fixed" elevation={0}>
      <HeaderToolbar maxWidth="lg">
        <LogoSection>
          <LogoButton
            type="button"
            aria-label={BRANDING.logoAlt}
            onClick={() => {
              window.location.href = BRANDING.homeUrl
            }}
          >
            <LogoImage src={BRANDING.logoUrl} alt={BRANDING.logoAlt} />
          </LogoButton>
        </LogoSection>

        <ContactSection>
          <HelpRow>
            <HelpIconImage src={BRANDING.helpIconUrl} alt="" aria-hidden />
            <HelpLabel>Need help?</HelpLabel>
          </HelpRow>

          <PhoneLink href={BRANDING.phoneHref}>
            <PhoneIcon fontSize="small" />
            {BRANDING.phoneDisplay}
          </PhoneLink>

          <HoursText>{BRANDING.supportHours}</HoursText>
        </ContactSection>
      </HeaderToolbar>
    </StyledAppBar>
  )
}

export { HeaderSpacer }
