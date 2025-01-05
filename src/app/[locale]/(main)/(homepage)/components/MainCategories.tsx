'use client';

import Image from '@/components/common/Image';
import { useAppContext } from '@/hooks/useAppContext';
import { ChevronLeft } from '@mui/icons-material';
import { Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import HomepageSwiper from './HomepageSwiper';
import HomepageSwiperSlide from './HomepageSwiperSlide';

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
  const width = isMobile ? 100 : 180;

  return (
    <HomepageSwiper>
      {items.map((item, index) => {
        const params = new URLSearchParams();
        params.set('categoryId', item.id.toString());

        return (
          <HomepageSwiperSlide index={index} key={item.id} width={width}>
            <Link key={item.id} href={`/search?${params.toString()}`}>
              <Stack spacing={1} alignItems="center">
                <Image
                  width={width}
                  height={width}
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
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
          </HomepageSwiperSlide>
        );
      })}
    </HomepageSwiper>
  );
};

export default MainCategories;
