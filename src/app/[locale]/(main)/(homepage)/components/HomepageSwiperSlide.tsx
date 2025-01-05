import { styled } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

export const HomepageSwiperSlide = styled(SwiperSlide)<{
  index?: number;
  width?: number;
}>(({ theme, index, width }) => ({
  height: 'auto',
  boxSizing: 'border-box',
  width,
  marginLeft: index === 0 ? theme.spacing(1.5) : 0,
}));

export default HomepageSwiperSlide;
