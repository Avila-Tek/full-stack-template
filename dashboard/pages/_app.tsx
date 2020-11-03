/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import * as Sentry from '@sentry/node';
import Router from 'next/router';
import NProgress from 'nprogress';
import Head from 'next/head';
import getConfig from 'next/config';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { RewriteFrames } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import { useApollo } from '../hooks/useApollo';
import AppProvider from '../context/AppProvider';
import AuthProvider from '../context/AuthContext';
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
      new Integrations.BrowserTracing(),
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

// @ts-ignore
export default function MyApp({ Component, pageProps, err }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <>
        <Head>
          <title>Next.js Template | Avila Tek</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="preload"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <AppProvider>
          <AuthProvider>
            <Component {...pageProps} err={err} />
          </AuthProvider>
        </AppProvider>
      </>
    </ApolloProvider>
  );
}
