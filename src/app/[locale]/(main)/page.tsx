import BestSellingProducts from '@/components/BestSellingProducts/BestSellingProducts';
import { Carousel } from '@/components/Carousel';
import { ICarouselItem } from '@/components/Carousel/Carousel';
import { MainCategories } from '@/components/MainCategories';
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
import { bestSellingSortOption } from '@/static/sortOptions';
import { Container, Grid } from '@mui/material';

const getSliders = async () => {
  const { data } = await getClient().query<GetHomePageSlidersQuery>({
    query: GET_HOMEPAGE_SLIDERS,
  });

  const items: ICarouselItem[] = [];
  data?.sliderCategories?.nodes?.map((item) => {
    item.sliders?.edges.forEach((edge) => {
      if (edge.node.featuredImage?.node.url) {
        const item: ICarouselItem = {
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

  return data.products?.nodes;
};

export default async function Home() {
  const sliders = await getSliders();
  const categories = await getCategories();
  const bestSellingProducts = await getBestSellingProducts();

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Carousel items={sliders} />
          </Grid>
          <Grid item xs={12}>
            <MainCategories items={categories} />
          </Grid>
          <Grid item xs={12}>
            <BestSellingProducts items={bestSellingProducts} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
