'use client';

import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

const FindYourSize = () => {
  const t = useTranslations();

  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{
        height: '100%',
        minWidth: 'fit-content',
      }}
    >
      {t('buttons.findYourSize')}
    </Button>
  );
};

export default FindYourSize;
