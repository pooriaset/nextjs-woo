import Attributes from '@/components/CartItem/components/Attributes';
import Image from '@/components/common/Image';
import PriceLabel from '@/components/common/PriceLabel';
import { ProductVariationContentSliceFragment } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface OrderVariantItemProps {
  variant: ProductVariationContentSliceFragment;
  productId: number | string;
  total: number | string;
  quantity: number | string;
}
const OrderVariantItem: FC<OrderVariantItemProps> = ({
  variant,
  productId,
  total,
  quantity,
}) => {
  const href = `/products/${productId}`;

  return (
    <Stack
      gap={2}
      direction="row"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: 2,
        borderRadius: 1.5,
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Link href={href}>
          <Image
            width={80}
            height={80}
            src={variant?.image?.sourceUrl}
            alt="Image"
          />
          <Box
            position="absolute"
            bottom={0}
            right={0}
            width={24}
            height={24}
            bgcolor="divider"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            color="text.primary"
          >
            {quantity || 1}
          </Box>
        </Link>
      </Box>

      <Box flexGrow={1}>
        <Stack gap={2}>
          <Typography
            component={Link}
            href={href}
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {variant?.name}
          </Typography>

          <Attributes
            size={variant?.attributes?.nodes?.[0]?.value?.toUpperCase()}
          />
          <PriceLabel value={total} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default OrderVariantItem;
