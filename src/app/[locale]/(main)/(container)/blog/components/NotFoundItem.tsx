'use client';

import { Warning } from '@mui/icons-material';
import { Alert, AlertTitle } from '@mui/material';
import { useTranslations } from 'next-intl';

const NotFoundItem = () => {
  const t = useTranslations();
  return (
    <Alert variant="outlined" color="warning" icon={<Warning />}>
      <AlertTitle>{t('blog.notFound.title')}</AlertTitle>
    </Alert>
  );
};

export default NotFoundItem;
