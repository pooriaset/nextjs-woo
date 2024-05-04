import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_PUBLISHED_PAGES_LIST } from '@/graphql/queries/pages';
import { GetPublishedPagesListQuery } from '@/graphql/types/graphql';
import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';

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

const MainLayout: FC<MainLayoutProps> = async ({ children }) => {
  const pagesList = await getPagesList();
  return (
    <>
      <Header />
      <Box
        sx={{
          pb: { xs: '56px', md: 0 },
        }}
      >
        {children}
      </Box>
      <Footer pages={pagesList} />
    </>
  );
};

export default MainLayout;
