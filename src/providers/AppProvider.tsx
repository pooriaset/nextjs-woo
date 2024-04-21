'use client';

import { appContext } from '@/contexts/appContext';
import { Theme, useMediaQuery } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
export interface AppProviderProps {
  userAgent: any;
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
