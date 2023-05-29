import { sha256 } from 'crypto-hash';
import { ApolloClient, HttpLink, InMemoryCache, concat } from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { ENDPOINT } from '../../config';

export const { getClient } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: ENDPOINT,
    // credentials: 'include',
  });
  const cache = new InMemoryCache({});
  return new ApolloClient<any>({
    cache,
    link: httpLink,
    // link: concat(createPersistedQueryLink({ sha256 }), httpLink),
    // credentials: 'include',
  }) as any;
});
