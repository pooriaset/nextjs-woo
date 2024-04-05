import { Box, Card, CardContent, Typography } from '@mui/material';

import { useAppContext } from '@/hooks/useAppContext';
import Link from 'next/link';
import DiscountPercentage from '../common/DiscountPercentage';
import Image from '../common/Image';
import OldPrice from '../common/OldPrice';
import PriceLabel from '../common/PriceLabel';
import { FC } from 'react';
import {
  extractNumbers,
  getMinOfRangePrice,
  getProfitPercentage,
} from '@/utils/price';

export interface ProductItemProps {
  data: any;
}
const ProductItem: FC<ProductItemProps> = ({ data }) => {
  const { isMobile } = useAppContext();

  const size = isMobile ? 120 : 240;

  const profitMarginPercentage = getProfitPercentage(
    extractNumbers(getMinOfRangePrice(data.price)),
    extractNumbers(data.regularPrice),
  );

  return (
    <Card
      component={Link}
      href={`/products/2546/title`}
      sx={{
        display: 'block',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: 1,
          }}
        >
          <Image
            height={size}
            width={size}
            src={data.image.sourceUrl}
            alt="Product Image"
            style={{
              objectFit: 'contain',
              display: 'block',
              width: isMobile ? 120 : '100%',
            }}
          />
          {!isMobile && <Box mt={3} />}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1,
              width: '100%',
            }}
          >
            <Typography variant="body2">{data.name}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'top',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              {data.onSale && (
                <DiscountPercentage value={profitMarginPercentage} />
              )}

              <Box>
                <PriceLabel value={data.price} />
                {data.regularPrice !== data.price && (
                  <OldPrice value={data.regularPrice} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
