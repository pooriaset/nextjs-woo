'use client';

import { ColumnFilters } from '@/components/ColumnFilters';
import { InlineFilters } from '@/components/InlineFilters';
import ProductsCount from '@/components/ProductsCount/ProductsCount';
import ProductsList from '@/components/ProductsList/ProductsList';
import SortRow from '@/components/SortRow/SortRow';
import {
  CategoriesQuery,
  GetAllVariableProductsQuery,
  OrderEnum,
  ProductsOrderByEnum,
  StockStatusEnum,
} from '@/gql/graphql';
import { GET_ALL_CATEGORIES_QUERY } from '@/graphql/queries/categories';
import { GET_ALL_VARIABLE_PRODUCTS_QUERY } from '@/graphql/queries/products';
import { useAppContext } from '@/hooks/useAppContext';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';

const Page = () => {
  const { isMobile } = useAppContext();

  const { data } = useSuspenseQuery<GetAllVariableProductsQuery>(
    GET_ALL_VARIABLE_PRODUCTS_QUERY,
    {
      variables: {
        field: ProductsOrderByEnum.Date,
        order: OrderEnum.Desc,
        stockStatus: StockStatusEnum.InStock,
      },
    },
  );

  const { data: categories } = useQuery<CategoriesQuery>(
    GET_ALL_CATEGORIES_QUERY,
  );

  if (isMobile) {
    return (
      <>
        <InlineFilters options={categories?.productCategories?.nodes} />

        <Container sx={{ mt: 2 }}>
          <ProductsList items={data.products} />
        </Container>
      </>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            minWidth: 270,
            width: 300,
          }}
        >
          <ColumnFilters options={categories?.productCategories?.nodes} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
              borderBottom: '1px solid',
              borderColor: (theme) => theme.palette.divider,
            }}
          >
            <SortRow />
            <ProductsCount value={data.products?.pageInfo.total} />
          </Box>
          <ProductsList items={data.products} />
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
