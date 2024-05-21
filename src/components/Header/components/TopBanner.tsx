import { ISliderItem } from '@/app/[locale]/(main)/(container)/(homepage)/components/MainSlider/types';
import Image from 'next/image';
import React, { FC } from 'react';

export interface TopBannerProps {
  data: ISliderItem | null;
}
const TopBanner: FC<TopBannerProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <Image
      width={2800}
      height={60}
      src={data.imageUrl}
      alt="Top Banner"
      style={{
        width: '100%',
        objectFit: 'cover',
      }}
    />
  );
};

export default TopBanner;
