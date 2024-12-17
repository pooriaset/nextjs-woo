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
    yup.setLocale(languages[locale].yupLocale!);
  }

  return <>{children}</>;
};

export default YupLocaleProvider;
