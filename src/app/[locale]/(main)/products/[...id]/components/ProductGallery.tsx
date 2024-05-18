'use client';

import Image from '@/components/common/Image';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Product } from '../../types/common';
import GalleryItem from './GalleryItem';

export type ProductImages = Extract<
  Product['galleryImages'],
  { __typename?: 'ProductToMediaItemConnection' }
>['nodes'];

export interface ProductImagesProps {
  galleryImages?: ProductImages;
  thumbnail: Product['image'];
}

interface ISelected {
  src: string;
  alt: string;
}

const ProductImages: FC<ProductImagesProps> = ({
  galleryImages = [],
  thumbnail,
}) => {
  const t = useTranslations();

  const [selected, setSelected] = useState<ISelected>({
    src: thumbnail?.sourceUrl!,
    alt: thumbnail?.altText!,
  });

  if (!galleryImages.length) {
    return null;
  }

  const _galleryImages = [thumbnail, ...galleryImages];

  return (
    <>
      <Image
        width={500}
        height={500}
        src={selected?.src}
        alt={selected?.alt}
        draggable={false}
        style={{
          userSelect: 'none',
          width: '100%',
          borderRadius: 8,
        }}
      />

      <Box
        sx={{
          maxWidth: '100%',
          display: 'flex',
          gap: 1,
        }}
      >
        {_galleryImages?.map((item) => {
          const handleClickOnItem = () => {
            setSelected({
              src: item?.sourceUrl!,
              alt: item?.altText!,
            });
          };

          return (
            <GalleryItem
              onClick={handleClickOnItem}
              alt={item?.altText}
              src={item?.sourceUrl}
              key={item?.id}
              isActive={item?.sourceUrl === selected.src}
            />
          );
        })}
      </Box>
    </>
  );
};

export default ProductImages;
