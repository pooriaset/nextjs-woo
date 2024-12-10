'use client';

import { Box, Container, Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import Menu from './components/Menu';
import { DesktopView } from '@/components/ResponsiveDesign';
import { useAppContext } from '@/hooks/useAppContext';

export interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useAppContext();
  return (
    <Container sx={{ mt: 3 }}>
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
    </Container>
  );
};

export default Layout;
