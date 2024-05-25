'use client';

import { AppBar, Container } from '@mui/material';
import { FC, Suspense } from 'react';
import DesktopView from '../ResponsiveDesign/components/DesktopView';
import MobileView from '../ResponsiveDesign/components/MobileView';
import { DesktopHeader, MobileHeader } from './components';
import TopBanner, {
  TopBannerProps,
} from '@/components/Header/components/TopBanner';
import { Z_INDEX_VALUES } from '@/config/responsive';

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
        zIndex: Z_INDEX_VALUES.siteHeader,
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
