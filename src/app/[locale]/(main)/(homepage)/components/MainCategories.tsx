'use client';

import Image from '@/components/common/Image';
import { useAppContext } from '@/hooks/useAppContext';
import { ChevronLeft } from '@mui/icons-material';
import { Link, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface IMainCategory {
  id: number | string;
  title: string;
  imageUrl: string;
}
export interface MainCategoriesProps {
  items: IMainCategory[];
}
const MainCategories: FC<MainCategoriesProps> = ({ items }) => {
  const { isMobile } = useAppContext();
  const theme = useTheme();

  const modules = [];
  if (!isMobile) {
    modules.push(Navigation);
  }

  const spaceBetween = theme.spacing(1);
  const width = isMobile ? 100 : 160;

  return (
    <>
      <Swiper
        dir={theme.direction}
        navigation={!!modules.length}
        modules={modules}
        slidesPerView={'auto'}
        spaceBetween={spaceBetween}
      >
        {items.map((item, index) => {
          const params = new URLSearchParams();
          params.set('categoryId', item.id.toString());

          return (
            <SwiperSlide
              key={item.id}
              style={{
                height: 'auto',
                boxSizing: 'border-box',
                width: isMobile ? 130 : 240,
                paddingLeft: index === items.length - 1 ? spaceBetween : 0,
              }}
            >
              <Link key={item.id} href={`/search?${params.toString()}`}>
                <Stack spacing={1} alignItems="center">
                  <Image
                    width={width}
                    height={width}
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />

                  <Stack direction="row" spacing={1}>
                    <Typography variant="body2">{item.title}</Typography>
                    {!isMobile && (
                      <ChevronLeft
                        fontSize="small"
                        sx={{
                          transform: (theme) =>
                            theme.direction === 'ltr' ? 'rotate(180deg)' : null,
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default MainCategories;
