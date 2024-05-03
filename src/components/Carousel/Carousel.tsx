'use client';

import { Box } from '@mui/material';
import { FC } from 'react';
import {
  Carousel as ReactCarousel,
  type CarouselProps as ReactCarouselProps,
} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export interface CarouselProps {
  CarouselProps?: Partial<ReactCarouselProps>;
  children: ReactCarouselProps['children'];
}

const Carousel: FC<CarouselProps> = ({ CarouselProps, children }) => {
  return (
    <Box
      sx={{
        '& .carousel-root': {
          direction: `initial !important`,
        },
        '& .control-dots': {
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'fit-content',
          transition: 'all 200ms ease',
        },
        '& .dot': {
          margin: (theme) => `${theme.spacing(0, 1 / 2)} !important`,
        },
        '& .dot.selected': {
          width: 16,
          borderRadius: 1,
        },
      }}
    >
      <ReactCarousel {...CarouselProps}>{children}</ReactCarousel>
    </Box>
  );
};

export default Carousel;
