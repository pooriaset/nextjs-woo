'use client';

import { Box, Container, Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import Menu from './components/Menu';

export interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Menu />

        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Stack>
    </Container>
  );
};

export default Layout;
