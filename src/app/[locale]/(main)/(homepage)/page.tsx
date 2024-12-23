import { MobileView } from '@/components/ResponsiveDesign';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_MAIN_CATEGORIES } from '@/graphql/queries/categories';
import { GET_VARIABLE_PRODUCTS_QUERY } from '@/graphql/queries/products';
import {
  GetAllProductsQuery,
  GetMainCategoriesQuery,
  StockStatusEnum,
} from '@/graphql/types/graphql';
import {
  bestSellingSortOption,
  menuOrderSortOptions,
  newestSortOption,
} from '@/static/sortOptions';
import { Container, Grid } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { MainSlider } from '../../../../components/MainSlider';
import Header from './components/Header';
import MainCategories from './components/MainCategories';
import ProductsSlider from './components/ProductsSlider';
import SlidersSkeleton from './components/SlidersSkeleton';

const getCategories = async () => {
  const { data } = await getClient().query<GetMainCategoriesQuery>({
    query: GET_MAIN_CATEGORIES,
    variables: {
      first: 6,
    },
  });

  const items =
    data?.productCategories?.edges?.map((item) => {
      return {
        id: item.node.id,
        title: item.node.name!,
        imageUrl: item.node.image?.sourceUrl!,
      };
    }) || [];

  return items;
};

const getBestSellingProducts = async () => {
  const { data } = await getClient().query<GetAllProductsQuery>({
    query: GET_VARIABLE_PRODUCTS_QUERY,
    variables: {
      q: null,
      stockStatus: StockStatusEnum.InStock,
      categoryIdIn: null,
      orderBy: [bestSellingSortOption.props],
      first: 10,
    },
  });
  return data?.products?.nodes;
};

const getLatestProducts = async () => {
  const { data } = await getClient().query<GetAllProductsQuery>({
    query: GET_VARIABLE_PRODUCTS_QUERY,
    variables: {
      q: null,
      stockStatus: StockStatusEnum.InStock,
      categoryIdIn: null,
      orderBy: [newestSortOption.props],
      first: 10,
    },
  });
  return data?.products?.nodes;
};

const getProductsByMenuOrder = async () => {
  const { data } = await getClient().query<GetAllProductsQuery>({
    query: GET_VARIABLE_PRODUCTS_QUERY,
    variables: {
      q: null,
      stockStatus: StockStatusEnum.InStock,
      categoryIdIn: null,
      orderBy: [menuOrderSortOptions.props],
      first: 10,
    },
  });
  return data?.products?.nodes;
};

export default async function Home() {
  const t = await getTranslations();

  const [categories, bestSellingProducts, latestProducts, menuOrderProducts] =
    await Promise.allSettled([
      getCategories(),
      getBestSellingProducts(),
      getLatestProducts(),
      getProductsByMenuOrder(),
    ]);

  return (
    <>
      <MobileView>
        <Container maxWidth="xl">
          <Header />
        </Container>
      </MobileView>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Suspense fallback={<SlidersSkeleton />}>
            <MainSlider />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MainCategories
                  items={
                    categories.status === 'fulfilled'
                      ? categories.value
                      : ([] as any)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <ProductsSlider
                  title={t('header.navigation.bestSelling')}
                  items={
                    bestSellingProducts.status === 'fulfilled'
                      ? bestSellingProducts.value
                      : ([] as any)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <ProductsSlider
                  title={t('header.navigation.newest')}
                  items={
                    latestProducts.status === 'fulfilled'
                      ? latestProducts.value
                      : ([] as any)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <ProductsSlider
                  title={t('header.navigation.selectedProducts')}
                  items={
                    menuOrderProducts.status === 'fulfilled'
                      ? menuOrderProducts.value
                      : ([] as any)
                  }
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
