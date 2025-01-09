import { InlineFilters } from '@/components/InlineFilters';
import { ProductsFilters } from '@/components/ProductsFilters';
import FiltersCard from '@/components/ProductsFilters/components/FiltersCard';
import ProductsList from '@/components/ProductsList/ProductsList';
import DesktopView from '@/components/ResponsiveDesign/components/DesktopView';
import MobileView from '@/components/ResponsiveDesign/components/MobileView';
import { Box, Container } from '@mui/material';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import ProductsListSkeleton from './components/ProductsListSkeleton';
import SortRow from './components/SortRow';
import SortWrapper from './components/SortWrapper';
import { Header } from '@/components/Header';

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
        <Header>
          <Container maxWidth="xl">
            <InlineFilters />
          </Container>
        </Header>
        <Suspense fallback={<ProductsListSkeleton />}>
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <ProductsList />
          </Container>
        </Suspense>
      </MobileView>

      <DesktopView>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              position: 'relative',
              mt: 3,
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
        </Container>
      </DesktopView>
    </>
  );
};

export default Page;
