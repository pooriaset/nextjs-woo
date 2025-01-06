import React, { FC } from 'react';
import Image from './Image';
import { ImageProps } from 'next/image';
import { useTheme } from '@mui/material';

const Logo: FC<Partial<ImageProps>> = (props) => {
  const options = {
    dark: '/assets/images/logo-dark.svg',
    light: '/assets/images/logo-light.svg',
  };

  const theme = useTheme();

  return (
    <Image
      draggable={false}
      width={176}
      height={32}
      alt="Logo"
      src={options[theme.palette.mode]}
      style={{
        width: 'fit-content',
      }}
      {...props}
    />
  );
};

export default Logo;
