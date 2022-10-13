import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  NormalizedCacheObject,
} from '@apollo/client';

import { ENDPOINT } from '../config';

let apolloClient: ApolloClient<NormalizedCacheObject>;

type TCreateApolloClient = { token?: string };

export function createApolloClient({
  token = undefined,
}: TCreateApolloClient = {}) {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...(token ? { 'x-token': token } : {}),
      },
    }));

    return forward(operation);
  });
  const httpLink = new HttpLink({
    uri: ENDPOINT,
    credentials: 'include',
  });
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache({}),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient =
    apolloClient ??
    createApolloClient({ token: initialState?.token ?? undefined });

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(
    () =>
      initializeApollo({
        ...(initialState ?? {}),
      }),
    [initialState]
  );
  return store;
}
