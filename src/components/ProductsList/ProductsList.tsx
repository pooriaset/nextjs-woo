import { GetAllVariableProductsQuery } from '@/graphql/types/graphql';
import { Grid } from '@mui/material';
import { FC } from 'react';
import { VariableProductItem } from '../VariableProductItem';
import NotFoundItem from '../common/NotFoundItem';

export interface ProductsListProps {
  items?: NonNullable<GetAllVariableProductsQuery['products']>['nodes'];
}
const ProductsList: FC<ProductsListProps> = ({ items }) => {
  if (!items?.length) {
    return <NotFoundItem />;
  }

  return (
    <Grid container spacing={1}>
      {items?.map((item) => {
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
