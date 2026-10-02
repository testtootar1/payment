import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { LEGACY_IMAGES, LEGACY_LINKS } from '../../../constants/legacyAssets'

const TOOLBAR_MAX_WIDTH = 1152

export function LegacyHeader() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
          background: '#FFFFFF',
          color: '#000000',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: TOOLBAR_MAX_WIDTH,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            pt: '20px',
            pb: { xs: 1.5, sm: 2 },
            minHeight: { xs: 100, sm: 110 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'space-between' },
            gap: { sm: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              flex: { xs: '0 0 auto', sm: '0 0 150px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'flex-start' },
              zIndex: 2,
            }}
          >
            <Link href={LEGACY_LINKS.home} underline="none" color="inherit">
              <Box
                component="img"
                src={LEGACY_IMAGES.logo}
                srcSet={`${LEGACY_IMAGES.logo2x} 2x`}
                alt="Thamesbank Insurance Services"
                sx={{
                  width: { xs: 130, sm: 150 },
                  height: 'auto',
                  display: 'block',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 0,
              px: 1,
            }}
          >
            <Box
              component="img"
              src={LEGACY_IMAGES.headerLogos}
              srcSet={`${LEGACY_IMAGES.headerLogos2x} 2x`}
              alt="Our partner brands: homeinsurer, tradeinsurer, CarInsurer.co.uk and Quote Your Home"
              sx={{
                height: { sm: 32, lg: 42 },
                width: 'auto',
                maxWidth: '100%',
                display: 'block',
              }}
            />
          </Box>

          <Box
            sx={{
              flex: { xs: '0 0 auto', sm: '0 0 auto' },
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 0.5,
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: { xs: '12px', sm: '14px' },
                fontWeight: 500,
              }}
            >
              <Box
                component="img"
                src={LEGACY_IMAGES.helpIcon}
                alt="help icon"
                sx={{ width: 24, height: 24 }}
              />
              Need help?
            </Box>

            <Link href={LEGACY_LINKS.phone} underline="none" color="inherit">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '14px', sm: '16px' },
                  lineHeight: 1.1,
                  color: '#000',
                }}
              >
                <LocalPhoneIcon
                  sx={{
                    color: '#000000',
                    fontSize: { xs: '14px', sm: '19px' },
                    marginRight: '5px',
                    verticalAlign: 'middle',
                  }}
                />
                {LEGACY_LINKS.phoneDisplay}
              </Typography>
            </Link>

            <Typography
              sx={{
                fontSize: { xs: '12px', sm: '13px' },
                color: '#000',
              }}
            >
              {LEGACY_LINKS.supportHours}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box className="nav-fix" />
    </Box>
  )
}

export function LegacyHeaderLogoLink() {
  return (
    <Link href={LEGACY_LINKS.home} className="legacy-home-link" underline="none">
      <img
        src={LEGACY_IMAGES.logo}
        srcSet={`${LEGACY_IMAGES.logo2x} 2x`}
        alt="Thamesbank Insurance Services"
      />
    </Link>
  )
}
