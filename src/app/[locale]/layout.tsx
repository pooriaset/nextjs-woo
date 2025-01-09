import RTLProvider from '@/components/common/RTLProvider';
import { defaultTheme, globalStyles, persianTheme } from '@/config/theme';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_GENERAL_SETTINGS } from '@/graphql/queries/general';
import { GetGeneralSettingsQuery } from '@/graphql/types/graphql';
import { Locale, languages } from '@/navigation';
import { ApolloProvider, AppProvider } from '@/providers';
import ConfirmAlertProvider from '@/providers/ConfirmAlertProvider';
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

import SessionProvider from '@/components/Auth/SessionProvider';
import IconsSymbols from '@/components/Icons/components/IconsSymbols';
import { Provider } from 'jotai';
import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';
import { DefaultTemplateString } from 'next/dist/lib/metadata/types/metadata-types';

export type LocaleLayoutParams = { params: { locale: Locale } };

export const generateMetadata = async (
  props: LocaleLayoutParams,
): Promise<Metadata> => {
  try {
    const { data } = await getClient().query<GetGeneralSettingsQuery>({
      query: GET_GENERAL_SETTINGS,
    });

    const title = data.generalSettings?.title || '';
    const description = data.generalSettings?.description || '';

    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_URL!;

    const imageUrl = `${baseUrl}/assets/images/logo.jpg`;

    const template = `%s - ${title!}`;

    const defaultTemplateString: DefaultTemplateString = {
      template,
      default: title,
    };

    return {
      title: defaultTemplateString,
      description: description,
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: './',
      },
      openGraph: {
        title: defaultTemplateString,
        description,
        url: baseUrl,
        siteName: title,
        images: [
          {
            url: imageUrl,
            width: 176,
            height: 40,
            alt: title,
          },
        ],
        locale: languages[props.params.locale].code || 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: defaultTemplateString,
        description,
        images: [imageUrl],
        creator: '@username',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      icons: {
        icon: '/favicon.ico',
        shortcut: '/assets/images/favicon-16x16.png',
        apple: '/assets/images/logo-192x192.png',
      },
    };
  } catch (error) {
    return {
      title: '',
    };
  }
};
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
                <Toaster containerClassName="toaster" position="top-center" />
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
