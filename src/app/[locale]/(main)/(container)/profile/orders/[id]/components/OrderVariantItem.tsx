import Attributes from '@/components/CartItem/components/Attributes';
import useAttributes from '@/components/CartItem/hooks/useAttributes';
import Image from '@/components/common/Image';
import PriceLabel from '@/components/common/PriceLabel';
import { ProductVariationContentSliceFragment } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface OrderVariantItemProps {
  variant: ProductVariationContentSliceFragment;
  productId: number | string;
  total: number | string;
  quantity: number | string;
  slug: string;
}
const OrderVariantItem: FC<OrderVariantItemProps> = ({
  variant,
  productId,
  total,
  quantity,
  slug,
}) => {
  const href = `/products/${productId}/${slug}`;

  const t = useTranslations();

  const attributes = useAttributes({
    attributes: variant.attributes,
    quantity,
  });

  return (
    <Stack
      component={Link}
      href={href}
      gap={2}
      direction="row"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: 2,
        borderRadius: 1.5,
        color: 'text.primary',
      }}
    >
      <Image
        width={80}
        height={80}
        src={variant?.image?.sourceUrl}
        alt="Image"
      />

      <Box flexGrow={1}>
        <Stack spacing={1}>
          <Typography
            component={Link}
            href={href}
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {variant?.name}
          </Typography>
          <Attributes items={attributes} />
          <PriceLabel value={total} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default OrderVariantItem;
