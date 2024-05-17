'use client';

import { createContext } from 'react';

export type SelectedVariantId = number | null;
export interface IProductContext {
  selectedVariantId: SelectedVariantId;
  handleChangeSelectedVariantId: (value: SelectedVariantId) => void;
}
export const productContext = createContext<IProductContext>({
  selectedVariantId: null,
  handleChangeSelectedVariantId: () => {},
});
