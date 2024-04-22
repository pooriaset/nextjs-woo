'use client';

import { appContext } from '@/contexts/appContext';
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
  const inMobileView = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  return (
    <appContext.Provider
      value={{
        isMobile: userAgent.device.type === 'mobile' || inMobileView,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
