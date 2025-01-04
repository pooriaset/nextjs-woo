'use client';

import { getFragmentData } from '@/graphql/types';
import { GetPostsQuery, PostItemFragmentDoc } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { ChevronLeft } from '@mui/icons-material';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostItem from './PostItem';

export interface PostsSliderProps {
  items: NonNullable<GetPostsQuery['posts']>['edges'];
}
const PostsSlider: FC<PostsSliderProps> = ({ items }) => {
  const theme = useTheme();
  const t = useTranslations();

  return (
    <Stack spacing={1} mt={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">{t('blog.latestPosts')}</Typography>
        <Button
          LinkComponent={Link}
          href="/blog"
          variant="text"
          color="primary"
          endIcon={
            <ChevronLeft
              sx={{
                transform: (theme) =>
                  theme.direction === 'rtl' ? 'translate(180deg)' : undefined,
              }}
            />
          }
        >
          {t('homepage.viewMore')}
        </Button>
      </Stack>
      <Swiper
        dir={theme.direction}
        navigation={true}
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        breakpoints={{
          [theme.breakpoints.values.xs]: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          [theme.breakpoints.values.sm]: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          [theme.breakpoints.values.md]: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          [theme.breakpoints.values.lg]: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        spaceBetween={theme.spacing(2)}
      >
        {items?.map(({ node }) => {
          const fragment = getFragmentData(PostItemFragmentDoc, node);
          return (
            <SwiperSlide
              key={fragment.databaseId}
              style={{
                height: 'auto',
                boxSizing: 'border-box',
              }}
            >
              <PostItem fragment={fragment} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Stack>
  );
};

export default PostsSlider;
