'use client';

import { AppBar, Container } from '@mui/material';
import { DesktopView, MobileView } from './components';
import { Suspense } from 'react';
import { useAppContext } from '@/hooks/useAppContext';

const Header = () => {
  const { isMobile } = useAppContext();
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
        {isMobile ? (
          <Suspense>
            <MobileView />
          </Suspense>
        ) : (
          <DesktopView />
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
