'use client';

import { Container } from '@mui/material';
import { Header } from '../Header';
import { DesktopHeader } from '../Header/components';
import MobileHeader from '../Header/components/MobileHeader';
import { DesktopView, MobileView } from '../ResponsiveDesign';

const MainLayoutHeader = () => {
  return (
    <Header>
      <MobileView>
        <MobileHeader />
      </MobileView>
      <Container maxWidth="xl">
        <DesktopView>
          <DesktopHeader />
        </DesktopView>
      </Container>
    </Header>
  );
};

export default MainLayoutHeader;
