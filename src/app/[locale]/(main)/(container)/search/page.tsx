import { ColumnFilters } from '@/components/ColumnFilters';
import { InlineFilters } from '@/components/InlineFilters';
import ProductsList from '@/components/ProductsList/ProductsList';
import DesktopView from '@/components/ResponsiveDesign/components/DesktopView';
import MobileView from '@/components/ResponsiveDesign/components/MobileView';
import { Box } from '@mui/material';
import { Suspense } from 'react';
import ProductsListSkeleton from './components/ProductsListSkeleton';
import SortRow from './components/SortRow';
import SortWrapper from './components/SortWrapper';

const Page = async (props: { searchParams: Record<string, string> }) => {
  return (
    <>
      <MobileView>
        <InlineFilters />
        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductsList />
        </Suspense>
      </MobileView>

      <DesktopView>
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
            }}
          >
            <ColumnFilters />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <SortWrapper>
              <SortRow />
              {/* <ProductsCount value={data.products?.pageInfo.total} /> */}
            </SortWrapper>

            <Suspense fallback={<ProductsListSkeleton />}>
              <ProductsList />
            </Suspense>
          </Box>
        </Box>
      </DesktopView>
    </>
  );
};

export default Page;
