'use client';

import { sha256 } from 'crypto-hash';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
  concat,
} from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { ENDPOINT } from '../../config';

function makeClient() {
  const httpLink = new HttpLink({
    uri: ENDPOINT,
  });

  return new ApolloClient<any>({
    cache: new NextSSRInMemoryCache({}) as any,
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }) as any,
            // createPersistedQueryLink({ sha256 }),
            httpLink,
          ])
        : httpLink, // concat(createPersistedQueryLink({ sha256 }), httpLink),
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient as any}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
