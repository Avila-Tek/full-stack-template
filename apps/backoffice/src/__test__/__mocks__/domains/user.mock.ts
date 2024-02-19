import { GET_USER } from '@/graphql/queries';
import { mockUser } from '../entities';

// Use this when you need to mock a GraphQL API

export const handlers = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        user: {
          ...mockUser(),
        },
      },
    },
  },
];

// Use this when you need to mock a Rest API
//export const handlers = [
// -- REST handlers -- https://mswjs.io/docs/api/http
//   http.get('/user/:id', ({ params }) => {
//     const { id } = params;
//     console.log('Fetching user with ID "%s"', id);
//   }),
//];
