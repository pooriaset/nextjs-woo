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
        <Box
          sx={{
            paddingBottom: MOBILE_FOOTER_HEIGHT,
          }}
        >
          {children}
        </Box>
      </MobileView>
      <DesktopView>
        <Container
          maxWidth="xl"
          sx={{
            mt: 3,
            pb: { xs: `${MOBILE_FOOTER_HEIGHT}px`, md: 0 },
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
