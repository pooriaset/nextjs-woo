'use client';

import PostItem from '@/components/PostItem/PostItem';
import { getFragmentData } from '@/graphql/types';
import { GetPostsQuery, PostItemFragmentDoc } from '@/graphql/types/graphql';
import { Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HomepageSwiper from './HomepageSwiper';
import HomepageSwiperSlide from './HomepageSwiperSlide';
import SlidersHeader from './SlidersHeader';

export interface PostsSliderProps {
  items: NonNullable<GetPostsQuery['posts']>['edges'];
}
const PostsSlider: FC<PostsSliderProps> = ({ items }) => {
  const t = useTranslations();

  return (
    <Stack spacing={1}>
      <SlidersHeader
        moreLink="/blog"
        title={t('blog.latestPosts')}
        buttonTitle={t('homepage.viewMore')}
      />

      <HomepageSwiper>
        {items?.map(({ node }, index) => {
          const fragment = getFragmentData(PostItemFragmentDoc, node);
          return (
            <HomepageSwiperSlide
              index={index}
              key={fragment.databaseId}
              width={240}
            >
              <PostItem fragment={fragment} />
            </HomepageSwiperSlide>
          );
        })}
      </HomepageSwiper>
    </Stack>
  );
};

export default PostsSlider;
