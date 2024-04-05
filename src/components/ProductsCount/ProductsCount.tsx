import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { FC } from 'react';

export interface ProductsCountProps {
  value?: number | null;
}

const ProductsCount: FC<ProductsCountProps> = ({ value }) => {
  if (!value) {
    return null;
  }
  return (
    <Typography variant="caption" sx={{ color: grey[500] }}>
      {value} کالا
    </Typography>
  );
};

export default ProductsCount;
