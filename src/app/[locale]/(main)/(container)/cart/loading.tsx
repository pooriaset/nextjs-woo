import { Grid } from '@mui/material';
import CartItemsSkeleton from './components/CartItemsSkeleton';
import CheckoutBoxSkeleton from './components/CheckoutBoxSkeleton';

const Loading = () => {
  return (
    <Grid container spacing={2} position="relative">
      <Grid item lg={9} md={6} xs={12}>
        <CartItemsSkeleton />
      </Grid>

      <Grid item lg={3} md={6} xs={12}>
        <CheckoutBoxSkeleton />
      </Grid>
    </Grid>
  );
};

export default Loading;
