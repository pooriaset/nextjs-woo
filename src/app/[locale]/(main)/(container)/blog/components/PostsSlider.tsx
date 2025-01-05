'use client';

import { getFragmentData } from '@/graphql/types';
import { GetPostsQuery, PostItemFragmentDoc } from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import { Stack, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostItem from './PostItem';
import SlidersHeader from '../../../(homepage)/components/SlidersHeader';

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

  const spaceBetween = theme.spacing(1.5);

  return (
    <Stack spacing={1} mt={3}>
      <SlidersHeader
        moreLink="/blog"
        title={t('blog.latestPosts')}
        buttonTitle={t('homepage.viewMore')}
      />

      <Swiper
        dir={theme.direction}
        navigation={true}
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        style={{
          paddingLeft: spaceBetween,
        }}
      >
        {items?.map(({ node }, index) => {
          const fragment = getFragmentData(PostItemFragmentDoc, node);
          return (
            <SwiperSlide
              key={fragment.databaseId}
              style={{
                height: 'auto',
                boxSizing: 'border-box',
                width: 240,
                marginRight: index === 0 ? spaceBetween : 0,
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
