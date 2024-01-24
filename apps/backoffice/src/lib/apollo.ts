import { env } from '@/env';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const getClient = (token?: string) => {
  const { getClient: _getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: env.NEXT_PUBLIC_API_URL,
        fetchOptions: { cache: 'no-store' },
        ...(typeof token === 'string'
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {}),
      }),
    });
  });
  return _getClient();
};
