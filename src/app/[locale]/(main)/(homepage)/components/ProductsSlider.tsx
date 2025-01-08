'use client';

import { VariableProductItem } from '@/components/VariableProductItem';
import { GetAllProductsQuery } from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { FC } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HomepageSwiper from './HomepageSwiper';
import HomepageSwiperSlide from './HomepageSwiperSlide';
import SlidersHeader from './SlidersHeader';

export interface ProductsSliderProps {
  title: string;
  items?: NonNullable<GetAllProductsQuery['products']>['nodes'];
}

const ProductsSlider: FC<ProductsSliderProps> = ({ title, items }) => {
  const { isMobile } = useAppContext();

  const slider = (
    <HomepageSwiper>
      {items?.map((product, index) => {
        if (product.__typename === 'VariableProduct') {
          return (
            <HomepageSwiperSlide
              key={product.databaseId}
              index={index}
              width={isMobile ? 165 : 240}
            >
              <VariableProductItem data={product} vertical />
            </HomepageSwiperSlide>
          );
        }
      })}
    </HomepageSwiper>
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
