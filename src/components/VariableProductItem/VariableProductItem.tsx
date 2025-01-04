'use client';

import { Box, Stack, Typography } from '@mui/material';

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
  vertical?: boolean;
}

const VariableProductItem: FC<ProductItemProps> = ({ data, vertical }) => {
  const { isMobile, variantImageSize } = useAppContext();

  const _horizontal = isMobile && !vertical;

  const outOfStock = data.stockStatus === StockStatusEnum.OutOfStock;

  return (
    <Box
      component={NextLink}
      href={`/products/${data.databaseId}/${data.slug}`}
      sx={{
        display: 'block',
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: _horizontal ? 'row' : 'column',
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
              width: _horizontal ? 120 : '100%',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1,
              width: '100%',
              mt: !_horizontal ? 3 : 0,
              p: 1,
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
      </Stack>
    </Box>
  );
};

export default VariableProductItem;
