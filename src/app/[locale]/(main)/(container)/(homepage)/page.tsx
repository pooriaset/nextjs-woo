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
import { bestSellingSortOption, newestSortOption } from '@/static/sortOptions';
import { Grid } from '@mui/material';
import ProductsSlider from './components/ProductsSlider';
import MainCategories from './components/MainCategories';
import { MainSlider } from './components/MainSlider';
import { ISliderItem } from './components/MainSlider/types';
import { getTranslations } from 'next-intl/server';

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

export default async function Home() {
  const sliders = await getSliders();
  const categories = await getCategories();
  const bestSellingProducts = await getBestSellingProducts();
  const latestProducts = await getLatestProducts();

  const t = await getTranslations();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MainSlider items={sliders} />
      </Grid>
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
    </Grid>
  );
}
