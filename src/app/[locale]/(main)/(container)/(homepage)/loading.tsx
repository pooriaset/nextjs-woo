import { Box, Grid, Skeleton } from '@mui/material';

const Loading = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" height={350} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {new Array(4).fill(1).map((item, index) => {
            return (
              <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
                <Box>
                  <Skeleton variant="rectangular" height={120} />
                  <Skeleton variant="text" width={60} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Loading;
