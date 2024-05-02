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

const Carousel = () => {
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
        {new Array(5).fill(1).map((image, index) => {
          return (
            <Box
              key={index.toString()}
              component={ImageWithDimensions}
              src="https://via.placeholder.com/2880x600"
              alt={index.toString()}
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
