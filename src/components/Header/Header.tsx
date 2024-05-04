'use client';

import { AppBar, Container } from '@mui/material';
import { FC, Suspense } from 'react';
import DesktopView from '../App/DesktopView';
import MobileView from '../App/MobileView';
import { DesktopHeader } from './components';
import TopBanner, {
  TopBannerProps,
} from '@/app/[locale]/(main)/components/TopBanner/TopBanner';

export interface HeaderProps {
  topBanner: TopBannerProps['data'];
}
const Header: FC<HeaderProps> = ({ topBanner }) => {
  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        borderBottom: '2px solid',
        borderColor: (theme) => theme.palette.divider,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#ffffff',
      }}
    >
      <TopBanner data={topBanner} />
      <Container maxWidth="xl">
        <DesktopView>
          <DesktopHeader />
        </DesktopView>
        <MobileView>
          <Suspense>
            <MobileView />
          </Suspense>
        </MobileView>
      </Container>
    </AppBar>
  );
};

export default Header;
