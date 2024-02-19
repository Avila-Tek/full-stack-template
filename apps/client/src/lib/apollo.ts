// import fetch from 'cross-fetch';
// import { HttpLink, InMemoryCache } from '@apollo/client';
// import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
// import { NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr';
// import { env } from 'process';

// export const { getClient } = registerApolloClient(() => {
//   return new NextSSRApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: env.NEXT_PUBLIC_API_URL,
//       fetch,
//     }),
//   });
// });

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
        fetch,
        fetchOptions: { cache: 'no-store' },
        ...(typeof token === 'string'
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {}),
      }),
    });
  });
  return _getClient();
};
