'use client';

import { Box, Link } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import React, { FC } from 'react';

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

export interface ISliderItem {
  id: number | string;
  title: string;
  imageUrl: string;
  url?: string | null;
}

export interface SliderItemProps {
  item: ISliderItem;
}

const SliderItem: FC<SliderItemProps> = ({ item }) => {
  return (
    <Link
      href={item.url || '#'}
      sx={{
        display: 'block',
      }}
    >
      <Box
        component={ImageWithDimensions}
        src={item.imageUrl}
        alt={item.title || 'Image'}
        sx={{
          borderRadius: 1,
        }}
      />
    </Link>
  );
};

export default SliderItem;
