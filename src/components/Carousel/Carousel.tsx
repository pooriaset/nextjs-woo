'use client';

import { Box, Link } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

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
  url?: string | null;
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
      <ReactCarousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        className="react-carousel"
      >
        {items.map((item) => {
          const key = `Image ${item.id}`;

          return (
            <Link
              key={key}
              href={item.url || '#'}
              sx={{
                display: 'block',
              }}
            >
              <Box
                component={ImageWithDimensions}
                src={item.imageUrl}
                alt={item.title || key}
                sx={{
                  borderRadius: 1,
                }}
              />
            </Link>
          );
        })}
      </ReactCarousel>
    </Box>
  );
};

export default Carousel;
