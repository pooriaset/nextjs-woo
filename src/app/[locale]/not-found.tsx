'use client';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Link as NextLink } from '@/navigation';
import { useTranslations } from 'next-intl';

const NotFound = () => {
  const t = useTranslations();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: (theme) => theme.palette.primary.main,
          mt: 5,
          fontWeight: 'bold',
        }}
      >
        404
      </Typography>
      <Typography variant="h6">{t('pages.notfound.message')}</Typography>

      <Button variant="outlined" component={NextLink} href="/">
        {t('buttons.homepage')}
      </Button>
    </Box>
  );
};

export default NotFound;
