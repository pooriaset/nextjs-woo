'use client';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { StockStatusEnum } from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import { Link as NextLink } from '@/navigation';
import { getMaxOfRangePrice } from '@/utils/price';
import { FC } from 'react';
import DiscountPercentage from '../common/DiscountPercentage';
import Image from '../common/Image';
import OldPrice from '../common/OldPrice';
import OutOfStock from '../common/OutOfStock';
import PriceLabel from '../common/PriceLabel';
import { VariableProduct } from './types';

export interface ProductItemProps {
  data: VariableProduct;
}

const VariableProductItem: FC<ProductItemProps> = ({ data }) => {
  const { isMobile, variantImageSize } = useAppContext();

  const outOfStock = data.stockStatus === StockStatusEnum.OutOfStock;

  return (
    <Card
      variant="outlined"
      component={NextLink}
      href={`/products/${data.databaseId}/${data.slug}`}
      sx={{
        display: 'block',
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': {
            paddingBottom: (theme) => `${theme.spacing(2)}`,
          },
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
            height={variantImageSize}
            width={variantImageSize}
            src={data.image?.sourceUrl!}
            alt="Product Image"
            style={{
              objectFit: 'contain',
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
            <Typography
              variant="body2"
              sx={{
                textAlign: 'left',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {data.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'top',
                justifyContent: data.onSale ? 'space-between' : 'end',
                mt: 1,
              }}
            >
              {outOfStock ? (
                <OutOfStock />
              ) : (
                <>
                  {data.onSale && (
                    <DiscountPercentage value={data.discountPercentage ?? 0} />
                  )}

                  {!!data.price && (
                    <Box>
                      <PriceLabel value={data.price} />
                      {data.regularPrice !== data.price && (
                        <OldPrice
                          value={getMaxOfRangePrice(data.regularPrice)}
                        />
                      )}
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VariableProductItem;
