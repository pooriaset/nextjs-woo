'use client';

import Image from '@/components/common/Image';
import { Box, IconButton, Stack, useTheme } from '@mui/material';
import { FC, useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../../types/common';
import GalleryItem from './GalleryItem';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export type GalleryImages = Extract<
  Product['galleryImages'],
  { __typename?: 'ProductToMediaItemConnection' }
>['nodes'];

export interface ProductGalleryProps {
  galleryImages?: GalleryImages;
  thumbnail: Product['image'];
}

interface ISelected {
  src: string;
  alt: string;
}

const ProductGallery: FC<ProductGalleryProps> = ({
  galleryImages = [],
  thumbnail,
}) => {
  const theme = useTheme();

  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const [selected, setSelected] = useState<ISelected>({
    src: thumbnail?.sourceUrl!,
    alt: thumbnail?.altText!,
  });

  if (!galleryImages.length) {
    return null;
  }

  const _galleryImages = [thumbnail, ...galleryImages];

  const height = 500;

  return (
    <Stack direction="row" spacing={2}>
      <Box>
        <IconButton
          size="large"
          onClick={handlePrev}
          sx={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <ExpandLess />
        </IconButton>

        <Swiper
          ref={sliderRef}
          dir={theme.direction}
          direction="vertical"
          style={{
            height: height - 2 * 48,
          }}
          breakpoints={{
            [theme.breakpoints.values.xs]: {
              slidesPerView: 1,
            },
            [theme.breakpoints.values.sm]: {
              slidesPerView: 2,
            },
            [theme.breakpoints.values.md]: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={theme.spacing(2)}
        >
          {_galleryImages?.map((item) => {
            const handleClickOnItem = () => {
              setSelected({
                src: item?.sourceUrl!,
                alt: item?.altText!,
              });
            };

            return (
              <SwiperSlide
                key={item?.id}
                style={{
                  height: 'auto',
                  boxSizing: 'border-box',
                }}
              >
                <GalleryItem
                  onClick={handleClickOnItem}
                  alt={item?.altText}
                  src={item?.sourceUrl}
                  isActive={item?.sourceUrl === selected.src}
                  width={72}
                  height={72}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <IconButton
          size="large"
          onClick={handleNext}
          sx={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <ExpandMore />
        </IconButton>
      </Box>
      <Box>
        <Image
          width={height}
          height={height}
          src={selected?.src}
          alt={selected?.alt}
          draggable={false}
          style={{
            userSelect: 'none',
            maxWidth: '100%',
            borderRadius: 8,
          }}
        />
      </Box>
    </Stack>
  );
};

export default ProductGallery;
