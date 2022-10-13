/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const withTM = require('next-transpile-modules')(['@avila-tek/ui']);
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const moduleExports = {
  // Your existing module.exports
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   images: {
  //     allowFutureImage: true,
  //   },
  // },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports =
  process.env.NODE_ENV === 'production'
    ? withTM(moduleExports) // ? withSentryConfig(withTM(moduleExports), sentryWebpackPluginOptions)
    : withTM(moduleExports);
