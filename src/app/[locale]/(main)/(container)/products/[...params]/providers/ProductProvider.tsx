'use client';

import { MOBILE_BUY_BOX_HEIGHT } from '@/config/responsive';
import { useAppContext } from '@/hooks/useAppContext';
import { Box } from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import {
  IProductContext,
  SelectedVariantId,
  productContext,
} from '../contexts/productContext';

export interface ProductProviderProps {
  value?: Partial<IProductContext>;
}
const ProductProvider: FC<PropsWithChildren<ProductProviderProps>> = ({
  children,
  value,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<SelectedVariantId>(
    value?.selectedVariantId ?? null,
  );

  const handleChangeSelectedVariantId = (value: any) => {
    setSelectedVariantId(+value);
  };

  const { isMobile } = useAppContext();

  return (
    <productContext.Provider
      value={{
        selectedVariantId,
        handleChangeSelectedVariantId,
      }}
    >
      <Box
        sx={{
          paddingBottom: isMobile ? `${MOBILE_BUY_BOX_HEIGHT}px` : null,
        }}
      >
        {children}
      </Box>
    </productContext.Provider>
  );
};

export default ProductProvider;
