'use client';

import { MOBILE_BUY_BOX_HEIGHT } from '@/config/responsive';
import { useAppContext } from '@/hooks/useAppContext';
import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  const { isMobile } = useAppContext();
  return (
    <Box
      sx={{
        paddingBottom: isMobile ? `${MOBILE_BUY_BOX_HEIGHT}px` : undefined,
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
