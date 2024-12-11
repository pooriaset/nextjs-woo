'use client';

import { Box, Container, Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import Menu from './components/Menu';
import { DesktopView, MobileView } from '@/components/ResponsiveDesign';
import { useAppContext } from '@/hooks/useAppContext';
import MobileHeader from '@/components/MobileHeader/MobileHeader';

export interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useAppContext();
  return (
    <>
      <DesktopView>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          <DesktopView>
            <Box
              sx={{
                width: 260,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <Menu />
            </Box>
          </DesktopView>

          {children}
        </Stack>
      </DesktopView>
      <MobileView>
        <Stack direction={'column'} spacing={2}>
          {children}
        </Stack>
      </MobileView>
    </>
  );
};

export default Layout;
