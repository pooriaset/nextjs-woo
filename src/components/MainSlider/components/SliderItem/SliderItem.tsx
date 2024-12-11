'use client';

import { Link } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { ISliderItem } from '../../types';

const SliderItem: FC<ISliderItem> = (props) => {
  return (
    <Link
      href={props.url || '#'}
      sx={{
        display: 'block',
        overflow: 'hidden',
        height: 300,
      }}
    >
      <Image
        priority
        width={2800}
        height={300}
        src={props.imageUrl}
        alt={`Image ${props.id}`}
        style={{
          objectFit: 'cover',
          maxWidth: '100%',
        }}
      />
    </Link>
  );
};

export default SliderItem;
