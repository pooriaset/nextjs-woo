import RTLProvider from "@/components/common/RTLProvider";
import { theme } from "@/config/theme";
import { Header } from "@/layout/Header";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import "./globals.css";

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
          <RTLProvider>
            <Header />
            <Container>{children}</Container>
          </RTLProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
