import { GraphQLError } from 'graphql';
import { GET_USER } from '@/graphql/queries';
import { mockUser } from '../entities';
import { IUser } from '@avila-tek/models';

// ============ Use this when you need to mock a GraphQL API ============
const getUserMock = {
  request: {
    query: GET_USER,
  },
  result: (variables: Partial<IUser>) => {
    // you can use the variables to return different results
    if (variables.email === 'pepito@gmail.com') {
      return {
        data: {
          user: { ...mockUser({ email: 'pepito@gmail.com' }) },
        },
      };
    }
    // return the default result
    return {
      data: {
        user: { ...mockUser() },
      },
    };
  },
  maxUsageCount: 2, // The mock can be used twice before it's removed, default is 1
};

const getUserMockError = {
  request: {
    query: GET_USER,
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
};

// mutations example, it works the same way as queries
// const deleteUserMock = {
//   request: {
//     query: DELETE_USER,
//     variables: { name: 'Buck' },
//   },
//   result: { data: { deleteUser: mockUser() } },
// };

export const handlers = [getUserMock, getUserMockError];
