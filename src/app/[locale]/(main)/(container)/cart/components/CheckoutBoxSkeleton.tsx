import { Card, CardContent, Skeleton, Stack } from '@mui/material';
import React from 'react';

const CheckoutBoxSkeleton = () => {
  return (
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
  );
};

export default CheckoutBoxSkeleton;
