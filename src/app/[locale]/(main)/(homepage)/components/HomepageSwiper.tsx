'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { useTheme } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';

export interface HomepageSwiperProps {
  children: ReactNode;
}
const HomepageSwiper: FC<HomepageSwiperProps> = ({ children }) => {
  const theme = useTheme();
  const { isMobile } = useAppContext();

  const modules = [];
  if (!isMobile) {
    modules.push(Navigation);
  }
  const spaceBetween = theme.spacing(1.5);

  return (
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
      {children}
    </Swiper>
  );
};

export default HomepageSwiper;
