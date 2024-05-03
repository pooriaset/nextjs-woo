import { Carousel } from '@/components/Carousel';
import { ICarouselItem } from '@/components/Carousel/Carousel';
import { MainCategories } from '@/components/MainCategories';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_MAIN_CATEGORIES } from '@/graphql/queries/categories';
import { GET_HOMEPAGE_SLIDERS } from '@/graphql/queries/sliders';
import {
  GetHomePageSlidersQuery,
  GetMainCategoriesQuery,
} from '@/graphql/types/graphql';
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

export default async function Home() {
  const sliders = await getSliders();
  const categories = await getCategories();

  return (
    <main>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Carousel items={sliders} />
          </Grid>
          <Grid item xs={12}>
            <MainCategories items={categories} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
