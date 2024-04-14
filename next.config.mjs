/** @type {import('next').NextConfig} */
import nextIntlPlugin from 'next-intl/plugin';

const withNextIntl = nextIntlPlugin(
  // Specify a custom next-intl path
  './src/i18n.ts',
);

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '6600',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
