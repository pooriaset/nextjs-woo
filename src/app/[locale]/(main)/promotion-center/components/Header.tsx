'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

const Header = () => {
  const t = useTranslations();
  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg,#b500d0,#ff3a49)',
        textAlign: 'center',
        minHeight: 150,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        component="h1"
        sx={{
          color: '#fff',
          fontWeight: 600,
          fontSize: '1.75rem',
          pt: 5,
        }}
      >
        {t('header.navigation.promotions')}
      </Typography>
    </Box>
  );
};

export default Header;
