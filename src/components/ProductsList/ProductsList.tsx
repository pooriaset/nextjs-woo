'use client';

import { GET_VARIABLE_PRODUCTS_QUERY } from '@/graphql/queries/products';
import { GetAllProductsQuery, StockStatusEnum } from '@/graphql/types/graphql';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { sortOptions } from '@/static/sortOptions';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import {
  VariableProductItem,
  VariableProductItemSkeleton,
} from '../VariableProductItem';
import NotFoundItem from '../common/NotFoundItem';

export interface ProductsListProps {}
const ProductsList: FC<ProductsListProps> = () => {
  const { inStock, categoryId, sort, q } = useCustomSearchParams();

  const variables = {
    stockStatus: inStock ? StockStatusEnum.InStock : null,
    categoryIdIn: categoryId ? [+categoryId] : null,
    q,
    orderBy: [sortOptions.find((item) => item.key === sort)?.props],
    first: 4,
  };

  const initQuery = useSuspenseQuery<GetAllProductsQuery>(
    GET_VARIABLE_PRODUCTS_QUERY,
    {
      variables,
    },
  );

  const paginateQuery = useQuery<GetAllProductsQuery>(
    GET_VARIABLE_PRODUCTS_QUERY,
    {
      variables,
      skip: true,
    },
  );

  const items = [
    ...(initQuery.data?.products?.nodes || []),
    ...(paginateQuery.data?.products?.nodes || []),
  ];

  const { hasNextPage, endCursor } = {
    ...initQuery.data?.products?.pageInfo,
    ...paginateQuery.data?.products?.pageInfo,
  };

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    if (isIntersecting) {
      paginateQuery.fetchMore({
        variables: {
          ...variables,
          after: endCursor,
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          const newNodes = fetchMoreResult.products?.nodes || [];
          const pageInfo = fetchMoreResult.products?.pageInfo!;

          return newNodes?.length!
            ? {
                ...previousQueryResult,

                products: {
                  ...previousQueryResult.products,

                  nodes: [
                    ...(previousQueryResult.products?.nodes || []),
                    ...newNodes,
                  ],

                  pageInfo,
                },
              }
            : previousQueryResult;
        },
      });
    }
  }, [isIntersecting]);

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

      {hasNextPage && (
        <>
          {new Array(4 - (items.length % 4)).fill(1).map((_, index) => {
            return (
              <Grid
                ref={index === 0 ? ref : null}
                key={index.toString()}
                item
                xs={12}
                md={6}
                lg={4}
                xl={3}
              >
                <VariableProductItemSkeleton />
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
};

export default ProductsList;
