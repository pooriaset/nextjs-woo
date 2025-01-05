'use client';

import { VariableProductItem } from '@/components/VariableProductItem';
import { GetAllProductsQuery } from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import { Card, CardContent, CardHeader, Stack, useTheme } from '@mui/material';
import { FC } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlidersHeader from './SlidersHeader';

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

  const spaceBetween = theme.spacing(1.5);

  const slider = (
    <Swiper
      dir={theme.direction}
      navigation={!!modules.length}
      modules={modules}
      slidesPerView={'auto'}
      spaceBetween={spaceBetween}
      style={{
        paddingLeft: spaceBetween,
      }}
    >
      {items?.map((product, index) => {
        if (product.__typename === 'VariableProduct') {
          return (
            <SwiperSlide
              key={product.databaseId}
              style={{
                height: 'auto',
                boxSizing: 'border-box',
                width: isMobile ? 165 : 240,
                marginRight: index === 0 ? spaceBetween : 0,
              }}
            >
              <VariableProductItem data={product} vertical />
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );

  if (isMobile) {
    return (
      <Stack spacing={1} mt={3}>
        <SlidersHeader title={title} />
        {slider}
      </Stack>
    );
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
        {slider}
      </CardContent>
    </Card>
  );
};

export default ProductsSlider;
