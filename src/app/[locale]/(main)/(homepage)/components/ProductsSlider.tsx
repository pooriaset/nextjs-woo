'use client';

import { VariableProductItem } from '@/components/VariableProductItem';
import { GetAllProductsQuery } from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { FC } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface ProductsSliderProps {
  title: string;
  items?: NonNullable<GetAllProductsQuery['products']>['nodes'];
}

const ProductsSlider: FC<ProductsSliderProps> = ({ title, items }) => {
  const theme = useTheme();

  const { isMobile } = useAppContext();

  const modules = [];
  if (!isMobile) {
    modules.push(Navigation);
  }

  return (
    <Card variant="outlined">
      <CardHeader
        title={title}
        sx={{
          textAlign: 'center',
        }}
      />
      <CardContent
        sx={{
          pr: 0,
        }}
      >
        <Swiper
          dir={theme.direction}
          navigation={!!modules.length}
          modules={modules}
          slidesPerView={'auto'}
          spaceBetween={theme.spacing(isMobile ? 1 : 2)}
        >
          {items?.map((product) => {
            if (product.__typename === 'VariableProduct') {
              return (
                <SwiperSlide
                  key={product.databaseId}
                  style={{
                    height: 'auto',
                    boxSizing: 'border-box',
                    width: isMobile ? 130 : 250,
                  }}
                >
                  <VariableProductItem data={product} vertical />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </CardContent>
    </Card>
  );
};

export default ProductsSlider;
