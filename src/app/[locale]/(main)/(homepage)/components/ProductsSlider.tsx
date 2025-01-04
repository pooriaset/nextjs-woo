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

  const spaceBetween = theme.spacing(isMobile ? 1 : 2);

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
          spaceBetween={spaceBetween}
        >
          {items?.map((product, index) => {
            if (product.__typename === 'VariableProduct') {
              return (
                <SwiperSlide
                  key={product.databaseId}
                  style={{
                    height: 'auto',
                    boxSizing: 'border-box',
                    width: isMobile ? 130 : 240,
                    paddingLeft: index === items.length - 1 ? spaceBetween : 0,
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
