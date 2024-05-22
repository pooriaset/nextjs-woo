'use client';

import React, { FC, PropsWithChildren, useState } from 'react';
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

  return (
    <productContext.Provider
      value={{
        selectedVariantId,
        handleChangeSelectedVariantId,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
