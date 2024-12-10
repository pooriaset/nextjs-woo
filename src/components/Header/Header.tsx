'use client';

import TopBanner, {
  TopBannerProps,
} from '@/components/Header/components/TopBanner';
import { Z_INDEX_VALUES } from '@/config/responsive';
import { AppBar, Container } from '@mui/material';
import { FC } from 'react';
import DesktopView from '../ResponsiveDesign/components/DesktopView';
import { DesktopHeader } from './components';

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
      </Container>
    </AppBar>
  );
};

export default Header;
