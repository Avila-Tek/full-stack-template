'use client';

import { env } from '@/env';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { PropsWithChildren, useMemo } from 'react';

function makeClient(token?: string) {
  return function _makeClient() {
    const httpLink = new HttpLink({
      uri: env.NEXT_PUBLIC_API_URL,
      credentials: 'include',
      fetchOptions: { cache: 'no-store' },
    });

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === 'undefined'
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              httpLink,
            ])
          : httpLink,
    });
  };
}

export function QueryProvider({
  children,
  token,
}: PropsWithChildren<{
  token?: string;
}>) {
  const makeClientMemo = useMemo(() => makeClient(token), [token]);
  return (
    <ApolloNextAppProvider makeClient={makeClientMemo}>
      {children}
    </ApolloNextAppProvider>
  );
}
