import { Button, ButtonProps } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface OutOfStockProps extends Partial<ButtonProps> {}
const OutOfStock: FC<OutOfStockProps> = (props) => {
  const t = useTranslations();
  return (
    <Button disabled fullWidth variant="outlined" color="inherit" {...props}>
      {t('products.outOfStock')}
    </Button>
  );
};

export default OutOfStock;
