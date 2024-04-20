import { Box, Container, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';

const Footer = () => {
  const t = useTranslations();
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.divider,
        py: 2,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2">{t('footer.text')}</Typography>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
        >
          <Link component={NextLink} href="#">
            {t('footer.links.aboutUs')}
          </Link>

          <Link component={NextLink} href="#">
            {t('footer.links.contactUs')}
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
