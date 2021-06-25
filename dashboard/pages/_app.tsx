import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../hooks/useApollo';
import '../styles.css';

// @ts-expect-error err is not defined
function MyApp({ Component, pageProps, err }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
      NProgress.done();
    });

    Router.events.on('routeChangeError', () => {
      NProgress.done();
    });
  }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <>
        <Head>
          <title>Plantilla Next.js | Avila Tek</title>
        </Head>
        <Component {...pageProps} err={err} />
      </>
    </ApolloProvider>
  );
}

export default MyApp;
