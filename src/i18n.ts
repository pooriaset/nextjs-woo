import deepmerge from 'deepmerge';
import type { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import en from '@/data/i18n/en.json';
import fa from '@/data/i18n/fa.json';
import { Locale } from './navigation';

const localeMessages: Partial<Record<Locale, any>> = {
  en,
  fa,
};

export default getRequestConfig(({ locale }) => {
  const primaryMessages: AbstractIntlMessages =
    localeMessages[locale as Locale] || localeMessages['en'];

  const fallbackMessages: AbstractIntlMessages = localeMessages['en'];

  const messages = deepmerge(fallbackMessages, primaryMessages);
  return { messages };
});
