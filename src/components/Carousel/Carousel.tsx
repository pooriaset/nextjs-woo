'use client';

import React, { FC } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import Image, { ImageProps } from 'next/image';
import { Box } from '@mui/material';

const ImageWithDimensions: FC<ImageProps> = ({ alt, ...props }) => {
  return (
    <Image
      width={2800}
      height={300}
      alt={alt}
      {...props}
      style={{
        objectFit: 'cover',
        ...props.style,
      }}
    />
  );
};

export interface ICarouselItem {
  id: number | string;
  title: string;
  imageUrl: string;
}
export interface CarouselProps {
  items: ICarouselItem[];
}

const Carousel: FC<CarouselProps> = ({ items }) => {
  return (
    <Box
      sx={{
        '& .react-carousel': {
          direction: 'initial',
        },
      }}
    >
      <ReactCarousel
        autoPlay
        infiniteLoop
        showStatus={false}
        className="react-carousel"
      >
        {items.map((item) => {
          const key = `Image ${item.id}`;
          return (
            <Box
              key={key}
              component={ImageWithDimensions}
              src={item.imageUrl}
              alt={item.title || key}
              sx={{
                borderRadius: 1,
              }}
            />
          );
        })}
      </ReactCarousel>
    </Box>
  );
};

export default Carousel;
