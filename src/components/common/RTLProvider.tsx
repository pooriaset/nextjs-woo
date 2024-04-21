'use client';

import { Locale, languages } from '@/navigation';
import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Direction } from '@mui/material';
import { useLocale } from 'next-intl';
import { FC, ReactNode } from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const ltrCache = createCache({
  key: 'mui',
});

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const caches: Record<Direction, EmotionCache> = {
  ltr: ltrCache,
  rtl: rtlCache,
};
const RTLProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const locale = useLocale();
  return (
    <CacheProvider
      value={caches[languages[locale as Locale]?.direction ?? 'ltr']}
    >
      {children}
    </CacheProvider>
  );
};

export default RTLProvider;
