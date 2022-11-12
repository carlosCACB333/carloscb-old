/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const withPWA = require('next-pwa')({
  dest: 'public',
  mode: 'production',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'media.graphassets.com',
        protocol: 'https',
        pathname: '/*',
      },
    ],
  },
});
