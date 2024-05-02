import { Carousel } from '@/components/Carousel';
import { ICarouselItem } from '@/components/Carousel/Carousel';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_HOMEPAGE_SLIDERS } from '@/graphql/queries/sliders';
import { GetHomePageSlidersQuery } from '@/graphql/types/graphql';
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
        };
        items.push(item);
      }
    });
  });

  return items;
};

export default async function Home() {
  const sliders = await getSliders();

  return (
    <main>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Carousel items={sliders} />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
