import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ISliderItem } from '@/components/HomePageSlider/types';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_PUBLISHED_PAGES_LIST } from '@/graphql/queries/pages';
import { GET_TOP_BANNER } from '@/graphql/queries/sliders';
import {
  GetPublishedPagesListQuery,
  GetTopBannerQuery,
} from '@/graphql/types/graphql';
import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface MainLayoutProps {
  children: ReactNode;
}

export type IPageListItem = NonNullable<
  GetPublishedPagesListQuery['pages']
>['edges'][number]['node'];

const getPagesList = async (): Promise<IPageListItem[]> => {
  const { data } = await getClient().query<GetPublishedPagesListQuery>({
    query: GET_PUBLISHED_PAGES_LIST,
  });

  return data.pages?.edges?.map((item) => item.node) || [];
};

const getTopBanner = async () => {
  const { data } = await getClient().query<GetTopBannerQuery>({
    query: GET_TOP_BANNER,
  });

  const _item = data?.sliderCategories?.nodes?.[0].sliders?.edges?.[0]?.node;
  if (_item && _item?.featuredImage?.node.url) {
    const data: ISliderItem = {
      id: _item.id,
      imageUrl: _item.featuredImage?.node.url,
      url: _item.url,
      title: _item.title!,
    };
    return data;
  }

  return null;
};

const MainLayout: FC<MainLayoutProps> = async ({ children }) => {
  const pagesList = await getPagesList();
  const topBanner = await getTopBanner();

  return (
    <>
      <Header topBanner={topBanner} />
      <Box
        sx={{
          pb: { xs: '56px', md: 0 },
          minHeight: '70vh',
        }}
      >
        {children}
      </Box>
      <Footer pages={pagesList} />
    </>
  );
};

export default MainLayout;
