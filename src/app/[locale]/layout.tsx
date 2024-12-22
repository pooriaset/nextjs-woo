import RTLProvider from '@/components/common/RTLProvider';
import { defaultTheme, globalStyles, persianTheme } from '@/config/theme';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_GENERAL_SETTINGS } from '@/graphql/queries/general';
import { GetGeneralSettingsQuery } from '@/graphql/types/graphql';
import { Locale, languages } from '@/navigation';
import { ApolloProvider, AppProvider } from '@/providers';
import I18nProvider from '@/providers/I18nProvider';
import {
  CssBaseline,
  GlobalStyles,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { PropsWithChildren } from 'react';
import ConfirmAlertProvider from '@/providers/ConfirmAlertProvider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import IconsSymbols from '@/components/Icons/components/IconsSymbols';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/Auth/SessionProvider';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'jotai';

export type LocaleLayoutParams = { params: { locale: Locale } };

// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const { data } = await getClient().query<GetGeneralSettingsQuery>({
//       query: GET_GENERAL_SETTINGS,
//     });

//     return {
//       title: {
//         template: `%s | ${data.generalSettings?.title!}`,
//         default: data.generalSettings?.title! ?? 'Test',
//       },
//       description: data.generalSettings?.description!,
//     };
//   } catch (error) {
//     return {
//       title: 'NextJs Woo',
//     };
//   }
// }

export default async function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<LocaleLayoutParams>) {
  const session = await getServerSession();
  const reqUserAgent = userAgent({ headers: headers() });

  const themes: Record<Locale, ThemeOptions> = {
    en: defaultTheme,
    fa: persianTheme,
  };

  return (
    <html lang={locale} dir={languages?.[locale]?.direction}>
      <body>
        <IconsSymbols />
        <SessionProvider session={session}>
          <Provider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={themes[locale] ?? defaultTheme}>
                <Toaster
                  // rtl={languages?.[locale]?.direction == 'rtl'}
                  position="top-center"
                />
                <ApolloProvider>
                  <AppProvider userAgent={reqUserAgent}>
                    <CssBaseline />
                    <GlobalStyles styles={globalStyles} />
                    <RTLProvider>
                      <I18nProvider locale={locale}>
                        <ConfirmAlertProvider>{children}</ConfirmAlertProvider>
                      </I18nProvider>
                    </RTLProvider>
                  </AppProvider>
                </ApolloProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
