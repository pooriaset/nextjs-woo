'use client';

import { ColumnFilters } from '@/components/ColumnFilters';
import { InlineFilters } from '@/components/InlineFilters';
import ProductsCount from '@/components/ProductsCount/ProductsCount';
import ProductsList from '@/components/ProductsList/ProductsList';
import SortRow from '@/components/SortRow/SortRow';
import { GET_ALL_CATEGORIES_QUERY } from '@/graphql/queries/categories';
import { GET_ALL_VARIABLE_PRODUCTS_QUERY } from '@/graphql/queries/products';
import {
  CategoriesQuery,
  GetAllVariableProductsQuery,
  OrderEnum,
  ProductsOrderByEnum,
  StockStatusEnum,
} from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';

const Page = () => {
  const { isMobile } = useAppContext();

  const { inStock, categoryId } = useCustomSearchParams();

  const { data } = useSuspenseQuery<GetAllVariableProductsQuery>(
    GET_ALL_VARIABLE_PRODUCTS_QUERY,
    {
      queryKey: ['GET_SEARCH_PAGE_PRODUCTS'],
      variables: {
        field: ProductsOrderByEnum.Date,
        order: OrderEnum.Desc,
        stockStatus: inStock ? StockStatusEnum.InStock : null,
        categoryIdIn: categoryId ? [+categoryId] : null,
      },
    },
  );

  const { data: categoriesData } = useQuery<CategoriesQuery>(
    GET_ALL_CATEGORIES_QUERY,
  );

  const categories = [
    { id: -1, parentId: -1, name: 'همه' },
    ...(categoriesData?.productCategories?.nodes ?? []),
  ];

  if (isMobile) {
    return (
      <>
        <InlineFilters categories={categories} />

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
          <ColumnFilters categories={categories} />
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
