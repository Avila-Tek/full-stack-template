const DEV_ENDPOINT = `http://localhost:5555/graphql`;
const PROD_ENDPOINT = `http://localhost:5555/graphql`;
export const ENDPOINT =
  process.env.NODE_ENV === 'development' ? DEV_ENDPOINT : PROD_ENDPOINT;
