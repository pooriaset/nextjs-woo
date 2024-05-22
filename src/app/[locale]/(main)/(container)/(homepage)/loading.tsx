import { VariableProductItemSkeleton } from '@/components/VariableProductItem';
import { Card, CardContent, Grid, Skeleton, Stack } from '@mui/material';

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
                <Stack alignItems="end">
                  <Skeleton width="100%" variant="rectangular" height={120} />
                  <Skeleton variant="text" width={60} />
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              {new Array(4).fill(1).map((item, index) => {
                return (
                  <Grid key={index} item xs={12} md={6} lg={3} xl={2}>
                    <VariableProductItemSkeleton />
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Loading;
