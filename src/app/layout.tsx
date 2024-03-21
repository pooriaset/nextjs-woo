import RTLProvider from "@/components/common/RTLProvider";
import { globalStyles, theme } from "@/config/theme";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Box, CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop app",
  description: "Shop app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles styles={globalStyles} />
          <RTLProvider>
            <Header />
            <Box
              sx={{
                pb: { xs: "56px", md: 0 },
              }}
            >
              {children}
            </Box>
            <Footer />
          </RTLProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
