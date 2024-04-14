import deepmerge from 'deepmerge';
import type { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import en_us from '@/data/i18n/en-us.json';
import fa_ir from '@/data/i18n/fa-ir.json';

const localeMessages: Record<string, any> = {
  'en-us': en_us,
  'fa-ir': fa_ir,
};

export default getRequestConfig(({ locale }) => {
  const primaryMessages: AbstractIntlMessages =
    localeMessages[locale] || localeMessages['en-us'];

  const fallbackMessages: AbstractIntlMessages = localeMessages['en-us'];

  const messages = deepmerge(fallbackMessages, primaryMessages);
  return { messages };
});
