import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GET_USERS(
    $filter: FilterFindManyUserInput
    $sort: SortFindManyUserInput
  ) {
    users(filter: $filter, sort: $sort) {
      firstName
      lastName
    }
  }
`;
