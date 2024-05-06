'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { FC, PropsWithChildren } from 'react';

const DesktopView: FC<PropsWithChildren> = ({ children }) => {
  const { isMobile } = useAppContext();

  if (isMobile) {
    return null;
  }

  return children;
};

export default DesktopView;
