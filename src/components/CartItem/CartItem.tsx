import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import Attributes from './components/Attributes';
import Image from '../common/Image';
import { ProductVariationContentSliceFragment } from '@/graphql/types/graphql';

export interface CartItemProps {
  value: ProductVariationContentSliceFragment;
}
const CartItem: FC<CartItemProps> = ({ value }) => {
  return (
    <Stack gap={2} direction="row">
      <Image width={80} height={80} src={value?.image?.sourceUrl} alt="Image" />
      <Box flexGrow={1}>
        <Stack gap={2}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {value?.name}
          </Typography>
          <Attributes
            size={value?.attributes?.nodes?.[0]?.value?.toUpperCase()}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default CartItem;
