import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GET_USERS {
    users {
      slug
      active
      firstName
      lastName
      email
    }
  }
`;
