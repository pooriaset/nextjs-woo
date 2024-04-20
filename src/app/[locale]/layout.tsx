import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import RTLProvider from '@/components/common/RTLProvider';
import { globalStyles, theme } from '@/config/theme';
import { Locale, languages } from '@/navigation';
import { AppProvider, ApolloProvider } from '@/providers';
import { Box, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { PropsWithChildren } from 'react';

export type WithChildren<T = unknown> = T & { children: React.ReactNode };

export type LocaleLayoutParams = { params: { locale: Locale } };
type LocaleLayoutProperties = PropsWithChildren<LocaleLayoutParams>;

export const metadata: Metadata = {
  title: 'Shop app',
  description: 'Shop app',
};

export default function LocaleLayout({
  children,
  params: { locale },
}: WithChildren<LocaleLayoutProperties>) {
  const messages = useMessages();

  return (
    <html lang={locale} dir={languages?.[locale]?.direction ?? 'ltr'}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={globalStyles} />
          <RTLProvider locale={locale}>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <AppProvider>
                <Header />
                <Box
                  sx={{
                    pb: { xs: '56px', md: 0 },
                  }}
                >
                  <ApolloProvider>{children}</ApolloProvider>
                </Box>
                <Footer />
              </AppProvider>
            </NextIntlClientProvider>
          </RTLProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
