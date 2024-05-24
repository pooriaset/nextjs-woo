import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

const CartItemSkeleton = () => {
  return (
    <Stack gap={2} direction="row">
      <Skeleton variant="rectangular" width={80} height={80} />
      <Box flexGrow={1}>
        <Stack gap={0.5}>
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={50} />
          <Skeleton variant="text" width={50} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default CartItemSkeleton;
