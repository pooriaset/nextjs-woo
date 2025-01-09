'use client';

import { ISliderItem } from '@/components/MainSlider/types';
import { GET_TOP_BANNER } from '@/graphql/queries/sliders';
import { GetTopBannerQuery } from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { FC } from 'react';

export interface TopBannerProps {}
const TopBanner: FC<TopBannerProps> = () => {
  const { isMobile } = useAppContext();

  const { data } = useQuery<GetTopBannerQuery>(GET_TOP_BANNER);

  const _item = data?.sliderCategories?.nodes?.[0]?.sliders?.edges?.[0]?.node;

  if (!_item?.featuredImage?.node.url) {
    return null;
  }

  const banner: ISliderItem | null = {
    id: _item.id,
    imageUrl: _item.featuredImage?.node.url,
    url: _item.url,
    title: _item.title!,
  };

  return (
    <Image
      width={2800}
      height={isMobile ? 35 : 60}
      src={banner.imageUrl}
      alt="Top Banner"
      style={{
        width: '100%',
        objectFit: 'cover',
      }}
    />
  );
};

export default TopBanner;
