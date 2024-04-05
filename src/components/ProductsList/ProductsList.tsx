import { GetAllVariableProductsQuery } from '@/gql/graphql';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { VariableProductItem } from '../VariableProductItem';

export interface ProductsListProps {
  items: GetAllVariableProductsQuery['products'];
}
const ProductsList: FC<ProductsListProps> = ({ items }) => {
  return (
    <Grid container spacing={1}>
      {items?.nodes?.map((item) => {
        if (item.__typename === 'VariableProduct') {
          return (
            <Grid key={item.databaseId} item xs={12} md={6} lg={4} xl={3}>
              <VariableProductItem data={item} />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default ProductsList;
