'use client';

import { Card, CardActions, CardContent, Grid, Skeleton } from '@mui/material';
import CartItemsSkeleton from './components/CartItemsSkeleton';
import CheckoutBoxSkeleton from './components/CheckoutBoxSkeleton';

const Loading = () => {
  return (
    <Grid container spacing={2} position="relative">
      <Grid item lg={9} md={6} xs={12}>
        <CartItemsSkeleton />
      </Grid>

      <Grid item lg={3} md={6} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <CheckoutBoxSkeleton />
          </CardContent>
          <CardActions>
            <Skeleton width="100%" variant="rectangular" height={42} />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Loading;
