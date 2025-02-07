import { MainSlider } from '@/components/MainSlider';
import { MobileView } from '@/components/ResponsiveDesign';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_POSTS } from '@/graphql/queries/blog';
import { GET_MAIN_CATEGORIES } from '@/graphql/queries/categories';
import { GET_VARIABLE_PRODUCTS_QUERY } from '@/graphql/queries/products';
import {
  GetAllProductsQuery,
  GetMainCategoriesQuery,
  GetPostsQuery,
  GetPostsQueryVariables,
  StockStatusEnum,
} from '@/graphql/types/graphql';
import {
  bestSellingSortOption,
  menuOrderSortOptions,
  newestSortOption,
} from '@/static/sortOptions';
import { Box, Stack } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import MobileHeader from './components/MobileHeader';
import MainCategories from './components/MainCategories';
import PostsSlider from './components/PostsSlider';
import ProductsSlider from './components/ProductsSlider';
import SlidersContainer from './components/SlidersContainer';
import SlidersSkeleton from './components/SlidersSkeleton';
import { Header } from '@/components/Header';
import ColorfulSection from './components/ColorfulSection';

const getCategories = async () => {
  const { data } = await getClient().query<GetMainCategoriesQuery>({
    query: GET_MAIN_CATEGORIES,
    variables: {
      first: 10,
      parent: 0,
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

const getBlogPosts = async () => {
  const { data } = await getClient().query<
    GetPostsQuery,
    Partial<GetPostsQueryVariables>
  >({
    query: GET_POSTS,
    variables: {
      first: 4,
    },
  });
  return data?.posts?.edges || [];
};

export default async function Home() {
  const t = await getTranslations();

  const [
    categories,
    bestSellingProducts,
    latestProducts,
    menuOrderProducts,
    posts,
  ] = await Promise.allSettled([
    getCategories(),
    getBestSellingProducts(),
    getLatestProducts(),
    getProductsByMenuOrder(),
    getBlogPosts(),
  ]);

  const _posts = posts.status === 'fulfilled' ? posts.value : ([] as any);

  return (
    <>
      <MobileView>
        <Header>
          <MobileHeader />
        </Header>
      </MobileView>

      <Stack spacing={4} alignItems="center">
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Suspense fallback={<SlidersSkeleton />}>
            <MainSlider />
          </Suspense>
        </Box>

        <SlidersContainer>
          <Stack spacing={4}>
            <MainCategories
              items={
                categories.status === 'fulfilled'
                  ? categories.value
                  : ([] as any)
              }
            />

            <ProductsSlider
              title={t('header.navigation.bestSelling')}
              items={
                bestSellingProducts.status === 'fulfilled'
                  ? bestSellingProducts.value
                  : ([] as any)
              }
            />

            <ProductsSlider
              title={t('header.navigation.newest')}
              items={
                latestProducts.status === 'fulfilled'
                  ? latestProducts.value
                  : ([] as any)
              }
            />

            <ProductsSlider
              title={t('header.navigation.selectedProducts')}
              items={
                menuOrderProducts.status === 'fulfilled'
                  ? menuOrderProducts.value
                  : ([] as any)
              }
            />
          </Stack>
        </SlidersContainer>

        {!!_posts.length && (
          <ColorfulSection>
            <SlidersContainer>
              <PostsSlider items={_posts} />
            </SlidersContainer>
          </ColorfulSection>
        )}
      </Stack>
    </>
  );
}
