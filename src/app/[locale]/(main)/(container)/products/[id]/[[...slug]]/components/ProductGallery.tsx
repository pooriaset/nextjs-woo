'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, IconButton, Stack, useTheme } from '@mui/material';
import { FC, useCallback, useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../../../types/common';
import GalleryItem from './GalleryItem';

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

  const _galleryImages = [thumbnail, ...galleryImages];
  const [selected, setSelected] = useState<number>(0);
  const selectedImage = _galleryImages[selected];

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();

    setSelected((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }
      return prevState;
    });
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();

    setSelected((prevState) => {
      if (prevState < _galleryImages.length - 1) {
        return prevState + 1;
      }
      return prevState;
    });
  }, [_galleryImages?.length]);

  const { isMobile } = useAppContext();

  if (isMobile) {
    return (
      <Swiper
        ref={sliderRef}
        dir={theme.direction}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {_galleryImages?.map((item) => {
          return (
            <SwiperSlide
              key={item?.id}
              style={{
                height: 'auto',
                boxSizing: 'border-box',
              }}
            >
              <img
                alt={item?.altText!}
                src={item?.sourceUrl!}
                style={{
                  objectFit: 'contain',
                  cursor: 'pointer',
                  userSelect: 'none',
                  width: '100%',
                  height: '100%',
                  maxHeight: 500,
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  return (
    <Stack direction="row" spacing={2}>
      <Box>
        <IconButton
          size="small"
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
          breakpoints={{
            [theme.breakpoints.values.md]: {
              slidesPerView: 4,
            },
          }}
          style={{
            height: 400,
            width: 72,
          }}
          spaceBetween={theme.spacing(2)}
        >
          {_galleryImages?.map((item, index) => {
            const handleClickOnItem = () => {
              setSelected(index);
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
                  isActive={index === selected}
                  width={72}
                  height={72}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <IconButton
          size="small"
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
        <img
          src={selectedImage?.sourceUrl!}
          alt={selectedImage?.altText!}
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
