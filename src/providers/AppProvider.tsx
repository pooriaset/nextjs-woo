"use client";

import { appContext } from "@/contexts/appContext";
import useIsMobile from "@/hooks/useIsMobile";
import { FC, PropsWithChildren } from "react";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <appContext.Provider
      value={{
        isMobile,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
