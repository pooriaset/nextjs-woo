'use client';

import { GetAllProductsQuery } from '@/graphql/types/graphql';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { VariableProductItem } from '../VariableProductItem';

export interface BestSellingProductsProps {
  items?: NonNullable<GetAllProductsQuery['products']>['nodes'];
}
const BestSellingProducts: FC<BestSellingProductsProps> = ({ items }) => {
  return (
    <Grid container spacing={1}>
      {items?.map((product) => {
        if (product.__typename === 'VariableProduct') {
          return (
            <Grid key={product.databaseId} item xs={12} md={6} lg={3} xl={2}>
              <VariableProductItem data={product} />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default BestSellingProducts;
