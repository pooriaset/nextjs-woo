'use client';

import { Header } from '@/components/Header';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC, useEffect } from 'react';

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />

      <Container
        maxWidth="xs"
        sx={{
          px: 2,
          mt: 6,
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            userSelect: 'none',
          }}
        >
          <Image
            width={200}
            height={200}
            src="/assets/images/unplugged.png"
            alt="Error!"
            style={{
              opacity: 0.68,
            }}
          />
          <Typography variant="h5" component="h1">
            {t('pages.error.message')}
          </Typography>
          <Button fullWidth variant="contained" size="large" onClick={reset}>
            {t('pages.error.buttons.reset')}
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Error;
