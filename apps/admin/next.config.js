/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@avila-tek/ui'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    serverComponentsExternalPackages: [],
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  release: process.env.NEXT_PUBLIC_RELEASE,
};

module.exports = nextConfig;

// module.exports =
//   process.env.NODE_ENV === 'production'
//     ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
//     : nextConfig;
