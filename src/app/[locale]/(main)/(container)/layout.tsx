import { DesktopView, MobileView } from '@/components/ResponsiveDesign';
import { MOBILE_FOOTER_HEIGHT } from '@/config/responsive';
import { Box, Container } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface Layout {
  children: ReactNode;
}

const Layout: FC<Layout> = async ({ children }) => {
  return (
    <>
      <MobileView>
        <Container
          maxWidth="xl"
          sx={{
            mt: 3,
            paddingBottom: MOBILE_FOOTER_HEIGHT,
          }}
        >
          {children}
        </Container>
      </MobileView>
      <DesktopView>
        <Container
          maxWidth="xl"
          sx={{
            mt: 3,
            minHeight: '70vh',
          }}
        >
          {children}
        </Container>
      </DesktopView>
    </>
  );
};

export default Layout;
