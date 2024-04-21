import { Locale } from '@/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import React, { FC, PropsWithChildren } from 'react';

export interface I18nProviderProps {
  locale: Locale;
}

const I18nProvider: FC<PropsWithChildren<I18nProviderProps>> = ({
  children,
  locale,
}) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};

export default I18nProvider;
