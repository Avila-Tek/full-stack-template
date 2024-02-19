import { gql } from '@apollo/client';

export const GET_USER = gql`
  query User($filter: FilterFindOneUserInput) {
    user(filter: $filter) {
      email
    }
  }
`;
