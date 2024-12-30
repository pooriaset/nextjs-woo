import { Footer } from '@/components/Footer';
import MainLayoutHeader from '@/components/MainLayoutHeader/MainLayoutHeader';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_PUBLISHED_PAGES_LIST } from '@/graphql/queries/pages';
import { IPageListItem } from '@/graphql/types/common';
import { GetPublishedPagesListQuery } from '@/graphql/types/graphql';
import { FC, ReactNode } from 'react';
import Wrapper from './(homepage)/components/Wrapper';

export interface LayoutProps {
  children: ReactNode;
}

const getPagesList = async (): Promise<IPageListItem[]> => {
  try {
    const { data } = await getClient().query<GetPublishedPagesListQuery>({
      query: GET_PUBLISHED_PAGES_LIST,
    });

    return data.pages?.edges?.map((item) => item.node) || [];
  } catch (error) {
    return [];
  }
};

const Layout: FC<LayoutProps> = async ({ children }) => {
  const pagesList = await getPagesList();

  return (
    <>
      <MainLayoutHeader />
      <Wrapper>{children}</Wrapper>
      <Footer pages={pagesList} />
    </>
  );
};

export default Layout;
