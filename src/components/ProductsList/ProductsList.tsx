import { GET_ALL_VARIABLE_PRODUCTS_QUERY } from '@/graphql/queries/products';
import { useSuspenseQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { VariableProductItem } from '../VariableProductItem';
import { GetAllVariableProductsQuery } from '@/gql/graphql';

const ProductsList = () => {
  const { data } = useSuspenseQuery<GetAllVariableProductsQuery>(
    GET_ALL_VARIABLE_PRODUCTS_QUERY,
  );

  return (
    <Grid container spacing={1}>
      {data?.products?.nodes?.map((data) => {
        if (data.__typename === 'VariableProduct') {
          return (
            <Grid key={data.databaseId} item xs={12} md={6} lg={4} xl={3}>
              <VariableProductItem data={data} />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default ProductsList;
