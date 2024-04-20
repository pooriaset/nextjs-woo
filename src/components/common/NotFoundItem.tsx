import { Warning } from '@mui/icons-material';
import { Alert, AlertTitle } from '@mui/material';
import { useTranslations } from 'next-intl';

const NotFoundItem = () => {
  const t = useTranslations();
  return (
    <Alert variant="outlined" color="warning" icon={<Warning />}>
      <AlertTitle>{t('products.notFound.title')}</AlertTitle>
      {t('products.notFound.message')}
    </Alert>
  );
};

export default NotFoundItem;
