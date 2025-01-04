'use client';

import { getFragmentData } from '@/graphql/types';
import { GetPostsQuery, PostItemFragmentDoc } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { ChevronLeft } from '@mui/icons-material';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostItem from './PostItem';
import { useAppContext } from '@/hooks/useAppContext';

export interface PostsSliderProps {
  items: NonNullable<GetPostsQuery['posts']>['edges'];
}
const PostsSlider: FC<PostsSliderProps> = ({ items }) => {
  const theme = useTheme();
  const t = useTranslations();

  const { isMobile } = useAppContext();

  const modules = [];
  if (!isMobile) {
    modules.push(Navigation);
  }

  const spaceBetween = theme.spacing(isMobile ? 1 : 2);

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
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={spaceBetween}
      >
        {items?.map(({ node }, index) => {
          const fragment = getFragmentData(PostItemFragmentDoc, node);
          return (
            <SwiperSlide
              key={fragment.databaseId}
              style={{
                height: 'auto',
                boxSizing: 'border-box',
                width: isMobile ? 160 : 240,
                paddingLeft: index === items.length - 1 ? spaceBetween : 0,
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
