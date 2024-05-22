'use client';

import {
  DESKTOP_PRODUCT_VARIANT_IMAGE_SIZE,
  MOBILE_PRODUCT_VARIANT_IMAGE_SIZE,
} from '@/config/images';
import { appContext } from '@/contexts/appContext';
import useCartQuery from '@/hooks/useCartQuery';
import { Theme, useMediaQuery } from '@mui/material';
import { userAgent } from 'next/server';
import { FC, PropsWithChildren } from 'react';

export interface AppProviderProps {
  userAgent: ReturnType<typeof userAgent>;
}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({
  children,
  userAgent,
}) => {
  useCartQuery();

  const inMobileView = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const isMobile = userAgent.device.type === 'mobile' || inMobileView;

  return (
    <appContext.Provider
      value={{
        isMobile,
        variantImageSize: isMobile
          ? MOBILE_PRODUCT_VARIANT_IMAGE_SIZE
          : DESKTOP_PRODUCT_VARIANT_IMAGE_SIZE,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
