import { Grid, Skeleton } from '@mui/material';

const Loading = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={5} xs={12}>
        <Skeleton height={500} variant="rectangular" />
      </Grid>
      <Grid item md={4} xs={12}>
        <Skeleton variant="text" sx={{ mb: 1 }} />
        <Skeleton variant="text" />

        <Grid
          container
          spacing={1}
          sx={{
            mt: 2,
          }}
        >
          <Grid item>
            <Skeleton variant="text" width={50} />
          </Grid>
          <Grid item>
            <Skeleton variant="text" width={80} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3} xs={12}>
        <Skeleton height={250} variant="rectangular" />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" />
      </Grid>
      <Grid item xs={12}>
        <Skeleton height={250} variant="rectangular" />
      </Grid>
    </Grid>
  );
};

export default Loading;
