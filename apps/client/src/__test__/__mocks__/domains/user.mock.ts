import { graphql, HttpResponse, http } from 'msw';

export const handlers = [
  // -- GraphQL handlers -- https://mswjs.io/docs/api/graphql
  // queries
  graphql.query('users', ({ query, variables }) => {
    const { userId } = variables;

    return HttpResponse.json({
      data: {
        users: [
          {
            name: 'John Doe',
          },
        ],
      },
    });
  }),

  // mutations
  graphql.mutation('createUser', ({ query, variables }) => {
    const { input } = variables;

    return HttpResponse.json({
      data: {
        user: {
          name: 'John Doe',
        },
      },
    });
  }),

  // -- REST handlers -- https://mswjs.io/docs/api/http

  //   http.get('/user/:id', ({ params }) => {
  //     const { id } = params;
  //     console.log('Fetching user with ID "%s"', id);
  //   }),
];
