'use client';

import { ISliderItem } from '@/components/MainSlider/types';
import { useAppContext } from '@/hooks/useAppContext';
import Image from 'next/image';
import { FC } from 'react';

export interface TopBannerProps {
  data: ISliderItem | null;
}
const TopBanner: FC<TopBannerProps> = ({ data }) => {
  const { isMobile } = useAppContext();

  if (!data) {
    return null;
  }

  return (
    <Image
      width={2800}
      height={isMobile ? 35 : 60}
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
