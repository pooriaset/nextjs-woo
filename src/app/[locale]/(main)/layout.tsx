import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          pb: { xs: '56px', md: 0 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
