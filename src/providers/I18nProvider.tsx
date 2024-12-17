import { Locale } from '@/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { FC, PropsWithChildren } from 'react';
import YupLocaleProvider from './YupLocaleProvider';

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
      <YupLocaleProvider locale={locale}>{children}</YupLocaleProvider>
    </NextIntlClientProvider>
  );
};

export default I18nProvider;
