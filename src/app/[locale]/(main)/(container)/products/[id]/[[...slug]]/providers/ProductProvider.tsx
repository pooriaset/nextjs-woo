'use client';

import { MOBILE_BUY_BOX_HEIGHT } from '@/config/responsive';
import { useAppContext } from '@/hooks/useAppContext';
import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export interface ProductProviderProps {}
const ProductProvider: FC<PropsWithChildren<ProductProviderProps>> = ({
  children,
}) => {
  const { isMobile } = useAppContext();

  return (
    <Box
      sx={{
        paddingBottom: isMobile ? `${MOBILE_BUY_BOX_HEIGHT}px` : null,
      }}
    >
      {children}
    </Box>
  );
};

export default ProductProvider;
