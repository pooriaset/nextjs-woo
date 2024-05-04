import SortRow from '@/app/[locale]/(main)/search/components/SortRow';
import DesktopView from '@/components/App/DesktopView';
import MobileView from '@/components/App/MobileView';
import { ColumnFilters } from '@/components/ColumnFilters';
import { InlineFilters } from '@/components/InlineFilters';
import ProductsCount from '@/components/ProductsCount/ProductsCount';
import ProductsList from '@/components/ProductsList/ProductsList';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_VARIABLE_PRODUCTS_QUERY } from '@/graphql/queries/products';
import { GetAllProductsQuery, StockStatusEnum } from '@/graphql/types/graphql';
import { sortOptions } from '@/static/sortOptions';
import { getSearchPageParams } from '@/utils/params';
import { Box, Container } from '@mui/material';
import SortWrapper from './components/SortWrapper';

const Page = async (props: { searchParams: Record<string, unknown> }) => {
  const { inStock, categoryId, sort, q } = getSearchPageParams(
    props.searchParams,
  );

  const { data } = await getClient().query<GetAllProductsQuery>({
    query: GET_VARIABLE_PRODUCTS_QUERY,
    variables: {
      stockStatus: inStock ? StockStatusEnum.InStock : null,
      categoryIdIn: categoryId ? [+categoryId] : null,
      q,
      orderBy: [sortOptions.find((item) => item.key === sort)?.props],
      first: 10,
    },
  });

  return (
    <>
      <MobileView>
        <InlineFilters />

        <Container sx={{ mt: 2 }}>
          <ProductsList items={data.products?.nodes} />
        </Container>
      </MobileView>

      <DesktopView>
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
              <ColumnFilters />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <SortWrapper>
                <SortRow />
                <ProductsCount value={data.products?.pageInfo.total} />
              </SortWrapper>

              <ProductsList items={data.products?.nodes} />
            </Box>
          </Box>
        </Container>
      </DesktopView>
    </>
  );
};

export default Page;
