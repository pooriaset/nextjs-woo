'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { Container } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface SlidersContainerProps {
  children: ReactNode;
}
const SlidersContainer: FC<SlidersContainerProps> = ({ children }) => {
  const { isMobile } = useAppContext();
  return (
    <Container
      maxWidth="xl"
      sx={{
        p: isMobile ? 0 : undefined,
      }}
    >
      {children}
    </Container>
  );
};

export default SlidersContainer;
