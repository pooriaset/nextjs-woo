import RTLProvider from '@/components/common/RTLProvider';
import { defaultTheme, globalStyles, persianTheme } from '@/config/theme';
import { Locale, languages } from '@/navigation';
import { ApolloProvider, AppProvider } from '@/providers';
import I18nProvider from '@/providers/I18nProvider';
import {
  CssBaseline,
  GlobalStyles,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { PropsWithChildren } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_GENERAL_SETTINGS } from '@/graphql/queries/general';
import { GetGeneralSettingsQuery } from '@/graphql/types/graphql';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type LocaleLayoutParams = { params: { locale: Locale } };

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await getClient().query<GetGeneralSettingsQuery>({
      query: GET_GENERAL_SETTINGS,
    });

    return {
      title: {
        template: `%s | ${data.generalSettings?.title!}`,
        default: data.generalSettings?.title! ?? 'Test',
      },
      description: data.generalSettings?.description!,
    };
  } catch (error) {
    return {
      title: 'NextJs Woo',
    };
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<LocaleLayoutParams>) {
  const reqUserAgent = userAgent({ headers: headers() });

  const themes: Record<Locale, ThemeOptions> = {
    en: defaultTheme,
    fa: persianTheme,
  };

  return (
    <html lang={locale} dir={languages?.[locale]?.direction}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={themes[locale] ?? defaultTheme}>
            <AppProvider userAgent={reqUserAgent}>
              <CssBaseline />
              <GlobalStyles styles={globalStyles} />
              <RTLProvider>
                <I18nProvider locale={locale}>
                  <ApolloProvider>{children}</ApolloProvider>
                </I18nProvider>
              </RTLProvider>
            </AppProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
