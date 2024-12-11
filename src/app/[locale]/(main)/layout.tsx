import { Footer } from '@/components/Footer';
import MainLayoutHeader from '@/components/MainLayoutHeader/MainLayoutHeader';
import { DesktopView, MobileView } from '@/components/ResponsiveDesign';
import { MOBILE_FOOTER_HEIGHT } from '@/config/responsive';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_PUBLISHED_PAGES_LIST } from '@/graphql/queries/pages';
import { IPageListItem } from '@/graphql/types/common';
import { GetPublishedPagesListQuery } from '@/graphql/types/graphql';
import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

const getPagesList = async (): Promise<IPageListItem[]> => {
  const { data } = await getClient().query<GetPublishedPagesListQuery>({
    query: GET_PUBLISHED_PAGES_LIST,
  });

  return data.pages?.edges?.map((item) => item.node) || [];
};

const Layout: FC<LayoutProps> = async ({ children }) => {
  const pagesList = await getPagesList();

  return (
    <>
      <MainLayoutHeader />

      <MobileView>
        <Box
          sx={{
            paddingBottom: `${MOBILE_FOOTER_HEIGHT}px`,
          }}
        >
          {children}
        </Box>
      </MobileView>
      <DesktopView>{children}</DesktopView>

      <Footer pages={pagesList} />
    </>
  );
};

export default Layout;
