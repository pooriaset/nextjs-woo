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
        hostname: 'api.nextwoo.ir',
      },
      {
        protocol: 'https',
        hostname: 'jsonplaceholder.typicode.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
