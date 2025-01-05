import React, { FC } from 'react';
import Image from './Image';
import { ImageProps } from 'next/image';

const Logo: FC<Partial<ImageProps>> = (props) => {
  return (
    <Image
      draggable={false}
      width={176}
      height={32}
      alt="Logo"
      src="/assets/images/logo.svg"
      style={{
        width: 'fit-content',
      }}
      {...props}
    />
  );
};

export default Logo;
