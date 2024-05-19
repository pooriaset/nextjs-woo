import { DESKTOP_PRODUCT_VARIANT_IMAGE_SIZE } from '@/config/images';
import { createContext } from 'react';

export interface IAppContext {
  isMobile: null | boolean;
  variantImageSize: number;
}
export const appContext = createContext<IAppContext>({
  isMobile: null,
  variantImageSize: DESKTOP_PRODUCT_VARIANT_IMAGE_SIZE,
});
