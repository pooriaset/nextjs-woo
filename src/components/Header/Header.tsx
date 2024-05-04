'use client';

import { AppBar, Container } from '@mui/material';
import { Suspense } from 'react';
import DesktopView from '../App/DesktopView';
import MobileView from '../App/MobileView';
import { DesktopHeader } from './components';

const Header = () => {
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
