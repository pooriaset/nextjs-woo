'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useTheme } from '@mui/material';
import { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { SliderItem } from './components/SliderItem';
import { ISliderItem } from './types';

export interface MainSliderProps {
  items?: ISliderItem[];
}

const MainSlider: FC<MainSliderProps> = ({ items }) => {
  const theme = useTheme();
  return (
    <Swiper
      dir={theme.direction}
      autoplay={{
        delay: 3000,
        stopOnLastSlide: false,
      }}
      centeredSlides
      loop={true}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      pagination={{
        clickable: true,
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

export default MainSlider;
