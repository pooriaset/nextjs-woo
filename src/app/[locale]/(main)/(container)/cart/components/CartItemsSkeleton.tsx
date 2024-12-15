import { Card, CardContent, Skeleton, Stack } from '@mui/material';
import React from 'react';

const CartItemsSkeleton = () => {
  return (
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
  );
};

export default CartItemsSkeleton;
