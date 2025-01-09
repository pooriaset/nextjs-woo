import { ProductsFilters } from '@/components/ProductsFilters';
import { InlineFilters } from '@/components/InlineFilters';
import ProductsList from '@/components/ProductsList/ProductsList';
import DesktopView from '@/components/ResponsiveDesign/components/DesktopView';
import MobileView from '@/components/ResponsiveDesign/components/MobileView';
import { Box } from '@mui/material';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import ProductsListSkeleton from './components/ProductsListSkeleton';
import SortRow from './components/SortRow';
import SortWrapper from './components/SortWrapper';
import FiltersCard from '@/components/ProductsFilters/components/FiltersCard';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('header.navigation.products'),
  };
}

const Page = async () => {
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
            <FiltersCard>
              <ProductsFilters />
            </FiltersCard>
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
