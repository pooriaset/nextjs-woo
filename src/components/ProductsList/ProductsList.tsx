import { Grid } from '@mui/material';
import React from 'react';
import { ProductItem } from '../ProductItem';
import { useSuspenseQuery } from '@apollo/client';
import { FETCH_ALL_PRODUCTS_QUERY } from '@/graphql/queries/products';

const ProductsList = () => {
  const { data } = useSuspenseQuery<any>(FETCH_ALL_PRODUCTS_QUERY);

  return (
    <Grid container spacing={1}>
      {data?.products?.nodes?.map((data: any) => {
        return (
          <Grid key={data.databaseId} item xs={12} md={6} lg={4} xl={3}>
            <ProductItem data={data} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductsList;
