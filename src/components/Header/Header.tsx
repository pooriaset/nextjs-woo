'use client';

import { AppBar, Container } from '@mui/material';
import { FC, Suspense } from 'react';
import DesktopView from '../ResponsiveDesign/components/DesktopView';
import MobileView from '../ResponsiveDesign/components/MobileView';
import { DesktopHeader, MobileHeader } from './components';
import TopBanner, {
  TopBannerProps,
} from '@/components/Header/components/TopBanner';

export interface HeaderProps {
  topBanner?: TopBannerProps['data'];
}
const Header: FC<HeaderProps> = ({ topBanner }) => {
  return (
    <AppBar
      elevation={0}
      position="static"
      color="inherit"
      sx={{
        borderBottom: '2px solid',
        borderColor: (theme) => theme.palette.divider,
        position: 'sticky',
        top: 0,
        zIndex: 1299,
      }}
    >
      {topBanner && <TopBanner data={topBanner} />}
      <Container maxWidth="xl">
        <DesktopView>
          <DesktopHeader />
        </DesktopView>
        <MobileView>
          <Suspense>
            <MobileHeader />
          </Suspense>
        </MobileView>
      </Container>
    </AppBar>
  );
};

export default Header;
