/** @type {import('next').NextConfig} */
import nextIntlPlugin from 'next-intl/plugin';

const withNextIntl = nextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '6600',
      },
      {
        protocol: 'https',
        hostname: 'nextwoo.ir',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
