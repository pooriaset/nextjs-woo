import Image from '@/components/common/Image';
import { Box } from '@mui/material';
import React, { FC } from 'react';

export interface OrderItemImageProps {
  src: string;
}

const OrderItemImage: FC<OrderItemImageProps> = ({ src }) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: (theme) => theme.palette.divider,
        p: 0.5,
        borderRadius: 1,
      }}
    >
      <Image width={64} height={64} src={src} />
    </Box>
  );
};

export default OrderItemImage;
