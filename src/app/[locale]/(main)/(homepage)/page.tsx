import { MobileView } from '@/components/ResponsiveDesign';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_MAIN_CATEGORIES } from '@/graphql/queries/categories';
import { GET_VARIABLE_PRODUCTS_QUERY } from '@/graphql/queries/products';
import { GET_HOMEPAGE_SLIDERS } from '@/graphql/queries/sliders';
import {
  GetAllProductsQuery,
  GetHomePageSlidersQuery,
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
import Header from './components/Header';
import MainCategories from './components/MainCategories';
import { MainSlider } from '../../../../components/MainSlider';
import { ISliderItem } from '../../../../components/MainSlider/types';
import ProductsSlider from './components/ProductsSlider';

const getSliders = async () => {
  const { data } = await getClient().query<GetHomePageSlidersQuery>({
    query: GET_HOMEPAGE_SLIDERS,
  });

  const items: ISliderItem[] = [];
  data?.sliderCategories?.nodes?.map((item) => {
    item.sliders?.edges.forEach((edge) => {
      if (edge.node.featuredImage?.node.url) {
        const item: ISliderItem = {
          id: edge.node.id,
          title: edge.node.title || '',
          imageUrl: edge.node.featuredImage.node.url,
          url: edge.node.url,
        };
        items.push(item);
      }
    });
  });

  return items;
};

const getCategories = async () => {
  const { data } = await getClient().query<GetMainCategoriesQuery>({
    query: GET_MAIN_CATEGORIES,
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
  const sliders = await getSliders();
  const categories = await getCategories();
  const bestSellingProducts = await getBestSellingProducts();
  const latestProducts = await getLatestProducts();
  const menuOrderProducts = await getProductsByMenuOrder();

  const t = await getTranslations();

  return (
    <>
      <MobileView>
        <Container maxWidth="xl">
          <Header />
        </Container>
      </MobileView>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainSlider items={sliders} />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MainCategories items={categories} />
              </Grid>
              <Grid item xs={12}>
                <ProductsSlider
                  title={t('header.navigation.bestSelling')}
                  items={bestSellingProducts}
                />
              </Grid>
              <Grid item xs={12}>
                <ProductsSlider
                  title={t('header.navigation.newest')}
                  items={latestProducts}
                />
              </Grid>
              <Grid item xs={12}>
                <ProductsSlider
                  title={t('header.navigation.selectedProducts')}
                  items={menuOrderProducts}
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
