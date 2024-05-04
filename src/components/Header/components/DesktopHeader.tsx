'use client';

import { Suspense } from 'react';
import BottomSection from './BottomSection';
import TopSection from './TopSection';

const DesktopHeader = () => {
  return (
    <Suspense>
      <TopSection />
      <BottomSection />
    </Suspense>
  );
};

export default DesktopHeader;
