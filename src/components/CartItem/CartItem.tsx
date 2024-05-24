import { Box, Link, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import Attributes from './components/Attributes';
import Image from '../common/Image';
import { ProductVariationContentSliceFragment } from '@/graphql/types/graphql';

export interface CartItemProps {
  value: ProductVariationContentSliceFragment;
  href?: string;
}
const CartItem: FC<CartItemProps> = ({ value, href = '#' }) => {
  return (
    <Stack gap={2} direction="row">
      <Link href={href}>
        <Image
          width={80}
          height={80}
          src={value?.image?.sourceUrl}
          alt="Image"
        />
      </Link>
      <Box flexGrow={1}>
        <Stack gap={2}>
          <Link href={href}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {value?.name}
            </Typography>
          </Link>

          <Attributes
            size={value?.attributes?.nodes?.[0]?.value?.toUpperCase()}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default CartItem;
