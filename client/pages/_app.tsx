import React from 'react';
import * as Sentry from '@sentry/node';
import Router from 'next/router';
import Head from 'next/head';
import getConfig from 'next/config';
import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { RewriteFrames } from '@sentry/integrations';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../hooks/useApollo';
import '../styles.css';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(distDir, 'app:///_next');
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function MyApp({ Component, pageProps, err }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <>
        <Head>
          <title>Plantilla Next.js | Avila Tek</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,600;1,400&display=swap"
            rel="preload"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,600;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} err={err} />
      </>
    </ApolloProvider>
  );
}

export default MyApp;
