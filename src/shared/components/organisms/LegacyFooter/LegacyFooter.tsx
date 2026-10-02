import CallIcon from '@mui/icons-material/Call'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { LEGACY_IMAGES, LEGACY_LINKS } from '../../../constants/legacyAssets'

const PRIMARY_BLUE = '#3A86FF'

const ABOUT_LINKS = [
  { label: 'About Us', href: LEGACY_LINKS.aboutUs },
  { label: 'Contact Us', href: LEGACY_LINKS.contactUs },
  { label: 'Frequently Asked Questions', href: LEGACY_LINKS.faq },
  {
    label: 'Vulnerable Customers Policy',
    href: LEGACY_LINKS.vulnerableCustomers,
  },
] as const

const TERMS_LINKS = [
  { label: 'Terms of Business', href: LEGACY_LINKS.termsOfBusiness },
  { label: 'Privacy Notice', href: LEGACY_LINKS.privacyNotice },
  { label: 'Cookie Policy', href: LEGACY_LINKS.cookiePolicy },
  { label: 'Consumer Duty', href: LEGACY_LINKS.consumerDuty },
  { label: 'Complaints', href: LEGACY_LINKS.complaints },
] as const

interface LegacyFooterProps {
  showWave?: boolean
}

function FooterNavLink({ label, href }: { label: string; href: string }) {
  const isExternal = href.startsWith('http')

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      color="inherit"
      underline="hover"
      sx={{
        display: 'block',
        mb: 1.5,
        color: '#A2A9B0',
        fontSize: { xs: '14px', md: '15px' },
        fontWeight: 500,
      }}
    >
      {label}
    </Link>
  )
}

export function LegacyFooter({ showWave = true }: LegacyFooterProps) {
  return (
    <Box component="footer" sx={{ width: '100%' }}>
      {showWave ? (
        <svg
          style={{
            width: '100%',
            height: '80px',
            display: 'block',
            transform: 'scaleX(-1)',
          }}
          viewBox="0 0 1512 87"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,50 Q378,10 756,43.5 T1512,50 L1512,87 L0,87 Z"
            fill="#283646"
          />
        </svg>
      ) : null}

      <Box
        sx={{
          bgcolor: '#283646',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, sm: 8, md: 10 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${LEGACY_IMAGES.footerSkyline}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: { xs: 'center bottom', md: 'left bottom' },
            backgroundSize: { xs: 'contain', md: 'auto 75%' },
            opacity: 0.9,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            px: { xs: 3, sm: 5, md: 8, lg: 10, xl: 12 },
            maxWidth: '1600px',
            mx: 'auto',
            width: '100%',
          }}
        >
          <Grid
            container
            spacing={{ xs: 5, md: 6, lg: 8 }}
            sx={{ alignItems: 'flex-start' }}
          >
            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
              <Box sx={{ mb: { xs: 4, md: 5 } }}>
                <img
                  src={LEGACY_IMAGES.footerBrandLogo}
                  srcSet={`${LEGACY_IMAGES.footerBrandLogo2x} 2x`}
                  alt="Thamesbank Insurance"
                  style={{ height: '50px', width: 'auto', maxWidth: '140px' }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  color: '#A2A9B0',
                  fontSize: { xs: '14px', md: '15px' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <LocationOnIcon
                    sx={{
                      color: PRIMARY_BLUE,
                      mt: 0.5,
                      fontSize: { xs: 20, md: 22 },
                    }}
                  />
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    First Floor, Jupiter House
                    <br />
                    Orbital One, Green Street Green Road
                    <br />
                    Dartford, Kent DA1 1QG
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <EmailIcon
                    sx={{ color: PRIMARY_BLUE, fontSize: { xs: 20, md: 22 } }}
                  />
                  <Link
                    href={LEGACY_LINKS.email}
                    color="inherit"
                    underline="hover"
                    sx={{ fontSize: 'inherit' }}
                  >
                    info@thamesbankinsurance.co.uk
                  </Link>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CallIcon
                    sx={{ color: PRIMARY_BLUE, fontSize: { xs: 20, md: 22 } }}
                  />
                  <Link
                    href={LEGACY_LINKS.phone}
                    color="inherit"
                    underline="hover"
                    sx={{ fontSize: 'inherit' }}
                  >
                    {LEGACY_LINKS.phoneDisplay}
                  </Link>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2.5,
                  color: '#E0E3E6',
                  fontWeight: 600,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                About
              </Typography>
              {ABOUT_LINKS.map((item) => (
                <FooterNavLink key={item.label} {...item} />
              ))}
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 2, lg: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2.5,
                  color: '#E0E3E6',
                  fontWeight: 600,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                Terms
              </Typography>
              {TERMS_LINKS.map((item) => (
                <FooterNavLink key={item.label} {...item} />
              ))}
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 3, lg: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2.5,
                  color: '#E0E3E6',
                  fontWeight: 600,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                Join a Newsletter
              </Typography>

              <Box
                component="label"
                sx={{
                  display: 'block',
                  mb: 1,
                  color: '#A2A9B0',
                  fontSize: '14px',
                }}
              >
                Your Email
              </Box>

              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    borderRadius: 1,
                    fontSize: { xs: '14px', md: '15px' },
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
                    '&:hover fieldset': { borderColor: PRIMARY_BLUE },
                    '&.Mui-focused fieldset': { borderColor: PRIMARY_BLUE },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.55)',
                    opacity: 1,
                  },
                }}
              />

              <Button
                variant="contained"
                sx={{
                  bgcolor: PRIMARY_BLUE,
                  width: { xs: '120px', sm: '128px' },
                  height: { xs: '46px', sm: '53px' },
                  fontSize: { xs: '14px', sm: '15px' },
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#2f76e6' },
                }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ width: '100%', height: '9px', bgcolor: '#398CCB' }} />

      <Box
        sx={{
          bgcolor: '#398CCB80',
          color: '#283646',
          py: { xs: 4, md: 5 },
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 3, sm: 5, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: { xs: '13px', md: '14px' },
              lineHeight: 1.6,
              opacity: 0.95,
            }}
          >
            Thamesbank Insurance Services, Myinsurer.co.uk, Homeinsurer.co.uk,
            Tradeinsurer.co.uk, Quoteyourhome.co.uk, Driveinsurance.co.uk, and
            Quoteyourmotor.com are trading styles of Paragon Car Ltd. Paragon Car
            Ltd is authorised and regulated by the Financial Conduct Authority No
            312028. Registered at Jupiter House, Orbital One, Green Street Green
            Road, Dartford, Kent, DA1 1QG. Company number 04133312.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
