import { Carousel } from '@/components/Carousel';
import { ICarouselItem } from '@/components/Carousel/Carousel';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_ALL_SLIDER_ITEMS_QUERY } from '@/graphql/queries/sliders';
import { GetSlidersQuery } from '@/graphql/types/graphql';
import { Container, Grid } from '@mui/material';

const getSliders = async () => {
  const { data } = await getClient().query<GetSlidersQuery>({
    query: GET_ALL_SLIDER_ITEMS_QUERY,
  });

  const items =
    data.sliders?.edges?.map((item) => {
      return {
        id: item.node.id,
        title: item.node.title,
        imageUrl: item.node.featuredImage?.node.url,
      } as ICarouselItem;
    }) ?? [];
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
