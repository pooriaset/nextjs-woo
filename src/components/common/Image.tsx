'use client';

import Skeleton from '@mui/material/Skeleton';
import { grey } from '@mui/material/colors';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { FC, useState } from 'react';

const Image: FC<
  Omit<NextImageProps, 'alt' | 'src'> & {
    alt?: string | null;
    src?: NextImageProps['src'] | null;
  }
> = ({ width, height, alt, src, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  const handleOnLoad = () => {
    setLoaded(true);
  };

  const _src = src ?? '/assets/images/placeholders/placeholder.svg';
  const _alt = alt ?? 'No Image';

  return (
    <>
      {!loaded && src && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            margin: '0 auto',
            minWidth: width,
          }}
        />
      )}
      <NextImage
        width={width}
        height={height}
        alt={_alt}
        src={_src}
        {...props}
        onLoad={handleOnLoad}
        style={{
          maxWidth: '100%',
          ...props.style,
          visibility: loaded ? 'visible' : 'hidden',
          ...(!src
            ? {
                padding: typeof width === 'number' ? width / 10 : 24,
                backgroundColor: grey[50],
                objectFit: 'contain',
              }
            : {}),
        }}
      />
    </>
  );
};

export default Image;
