'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useTheme } from '@mui/material';
import { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { SliderItem } from './components/SliderItem';
import { IHomePageSliderItem } from './types';

export interface CarouselProps {
  items?: IHomePageSliderItem[];
}

const MySwiper: FC<CarouselProps> = ({ items }) => {
  const theme = useTheme();
  return (
    <Swiper
      dir={theme.direction}
      autoplay={{
        delay: 3000,
        stopOnLastSlide: false,
      }}
      loop={true}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      style={{
        borderRadius: 16,
      }}
    >
      {items?.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <SliderItem {...item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MySwiper;
