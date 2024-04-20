import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

export interface ProductsCountProps {
  value?: number | null;
}

const ProductsCount: FC<ProductsCountProps> = ({ value }) => {
  const t = useTranslations();

  if (!value) {
    return null;
  }
  return (
    <Typography variant="caption" sx={{ color: grey[500] }}>
      {value} {t('products.count')}
    </Typography>
  );
};

export default ProductsCount;
