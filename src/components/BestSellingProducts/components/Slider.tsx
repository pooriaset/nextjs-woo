'use client';

import { GetAllProductsQuery } from '@/graphql/types/graphql';
import { FC } from 'react';
import { useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { VariableProductItem } from '@/components/VariableProductItem';

export interface SliderProps {
  items?: NonNullable<GetAllProductsQuery['products']>['nodes'];
}
const Slider: FC<SliderProps> = ({ items }) => {
  const theme = useTheme();

  return (
    <Swiper
      dir={theme.direction}
      navigation={true}
      modules={[Autoplay, Navigation]}
      slidesPerView={1}
      breakpoints={{
        [theme.breakpoints.values.xs]: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        [theme.breakpoints.values.sm]: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        [theme.breakpoints.values.md]: {
          slidesPerView: 5,
          spaceBetween: 16,
        },
        [theme.breakpoints.values.lg]: {
          slidesPerView: 6,
          spaceBetween: 16,
        },
      }}
      spaceBetween={16}
    >
      {items?.map((product) => {
        if (product.__typename === 'VariableProduct') {
          return (
            <SwiperSlide key={product.databaseId}>
              <VariableProductItem data={product} />
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default Slider;
