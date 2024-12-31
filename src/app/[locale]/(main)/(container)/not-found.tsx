'use client';
import { Box, Button, Typography } from '@mui/material';
import { Link as NextLink } from '@/navigation';
import { useTranslations } from 'next-intl';
import Lottie from 'react-lottie';
import { useAppContext } from '@/hooks/useAppContext';

const NotFound = () => {
  const t = useTranslations();

  const { isMobile } = useAppContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 3,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Lottie
          options={
            {
              loop: true,
              autoplay: true,
              path: '/assets/json/404.json',
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            } as any
          }
          width={isMobile ? '60vw' : '25vw'}
          isStopped={false}
          isPaused={false}
        />
      </Box>
      <Typography variant="h6">{t('pages.notfound.message')}</Typography>

      <Button variant="outlined" component={NextLink} href="/">
        {t('buttons.homepage')}
      </Button>
    </Box>
  );
};

export default NotFound;
