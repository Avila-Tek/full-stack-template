import { env } from './env';

export const ENDPOINT =
  env.NEXT_PUBLIC_NODE_ENV === 'development'
    ? 'http://localhost:3000/graphql'
    : //'https://jsonplaceholder.typicode.com'
      env.NEXT_PUBLIC_API_URL;
