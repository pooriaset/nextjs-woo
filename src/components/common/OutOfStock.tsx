import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

const OutOfStock = () => {
  const t = useTranslations();
  return (
    <Button disabled fullWidth variant="outlined" color="inherit">
      {t('products.outOfStock')}
    </Button>
  );
};

export default OutOfStock;
