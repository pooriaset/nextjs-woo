import { Carousel } from '@/components/Carousel';
import { Container, Grid } from '@mui/material';

export default async function Home() {
  return (
    <main>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Carousel />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
