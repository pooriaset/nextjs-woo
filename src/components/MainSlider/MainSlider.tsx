'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useTheme } from '@mui/material';
import { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { SliderItem } from './components/SliderItem';
import { useSuspenseQuery } from '@apollo/client';
import { GetHomePageSlidersQuery } from '@/graphql/types/graphql';
import { GET_HOMEPAGE_SLIDERS } from '@/graphql/queries/sliders';
import { ISliderItem } from './types';

const MainSlider: FC = () => {
  const theme = useTheme();

  const { data } =
    useSuspenseQuery<GetHomePageSlidersQuery>(GET_HOMEPAGE_SLIDERS);

  const items: ISliderItem[] = [];
  data?.sliderCategories?.nodes?.map((item) => {
    item.sliders?.edges.forEach((edge) => {
      if (edge.node.featuredImage?.node.url) {
        const item: ISliderItem = {
          id: edge.node.id,
          title: edge.node.title || '',
          imageUrl: edge.node.featuredImage.node.url,
          url: edge.node.url,
        };
        items.push(item);
      }
    });
  });

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
