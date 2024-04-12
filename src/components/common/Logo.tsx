import React, { FC } from 'react';
import Image from './Image';
import { ImageProps } from 'next/image';

const Logo: FC<Partial<ImageProps>> = (props) => {
  return (
    <Image
      draggable={false}
      width={176}
      height={26}
      alt="Logo"
      src="/assets/images/logo.svg"
      {...props}
    />
  );
};

export default Logo;
