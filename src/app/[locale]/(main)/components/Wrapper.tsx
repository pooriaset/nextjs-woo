'use client';

import { MOBILE_FOOTER_HEIGHT } from '@/config/responsive';
import { useAppContext } from '@/hooks/useAppContext';
import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  const { isMobile } = useAppContext();
  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingBottom: isMobile ? `${MOBILE_FOOTER_HEIGHT}px` : undefined,
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
