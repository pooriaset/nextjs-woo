import CartItemSkeleton from '@/components/CartItem/components/CartItemSkeleton';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Stack,
} from '@mui/material';
import React from 'react';

const Loading = () => {
  const skeletonLength = 4;
  return (
    <Grid container spacing={2}>
      <Grid item lg={9} md={6} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              {new Array(skeletonLength).fill(0).map((item, index) => {
                const isLast = skeletonLength === index + 1;
                return (
                  <Grid item xs={12} key={index}>
                    <Stack spacing={2}>
                      <CartItemSkeleton />
                      {!isLast && <Divider />}
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item lg={3} md={6} xs={12}>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={1}>
                {new Array(3).fill(1).map((item, index) => {
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                    >
                      <Skeleton variant="text" width={80} />
                      <Skeleton variant="text" width={80} />
                    </Stack>
                  );
                })}
                <Skeleton variant="rectangular" height={45} />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Loading;
