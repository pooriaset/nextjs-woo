'use client';
import * as yup from 'yup';
import { languages } from '@/navigation';
import { Locale } from '@/navigation';
import React, { FC, ReactNode } from 'react';

interface YupLocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}
const YupLocaleProvider: FC<YupLocaleProviderProps> = ({
  locale,
  children,
}) => {
  if (languages[locale]) {
    const yupLocale = languages[locale].yupLocale;
    if (yupLocale) {
      yup.setLocale(yupLocale);
    }
  }

  return <>{children}</>;
};

export default YupLocaleProvider;
