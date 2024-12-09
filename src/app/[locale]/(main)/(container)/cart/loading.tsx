import { Card, CardContent, Grid, Skeleton, Stack } from '@mui/material';

const Loading = () => {
  return (
    <Grid container spacing={2} position="relative">
      <Grid item lg={9} md={6} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" spacing={1}>
              <Skeleton width={100} height={100} variant="rectangular" />
              <Stack width="60%" spacing={2}>
                <Skeleton width="80%" variant="rectangular" />
                <Skeleton width="40%" variant="rectangular" />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item lg={3} md={6} xs={12}>
        <Card variant="outlined">
          <CardContent>
            {new Array(4).fill(1).map((key) => {
              return (
                <Stack direction="row" key={key} justifyContent="space-between">
                  <Skeleton width="40%" />
                  <Skeleton width="40%" />
                </Stack>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Loading;
