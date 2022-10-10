import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ToastContextProvider, UserContextProvider } from '../context';
import { useApollo } from '../hooks';
import '../style.css';

// @ts-expect-error err is not defined
function MyApp({ Component, pageProps, err }: AppProps<any>) {
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
          <title>Avila Tek | Template</title>
        </Head>
        <ToastContextProvider>
          <UserContextProvider>
            <Component {...pageProps} err={err} />
          </UserContextProvider>
        </ToastContextProvider>
      </>
    </ApolloProvider>
  );
}

export default MyApp;
