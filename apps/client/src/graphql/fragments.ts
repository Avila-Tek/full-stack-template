import { gql } from '@apollo/client';

export const PaginationFragment = gql`
  fragment PaginationFragment on PaginationInfo {
    currentPage
    perPage
    pageCount
    itemCount
    hasNextPage
    hasPreviousPage
  }
`;

export const UserFragment = gql`
  fragment UserFragment on User {
    email
  }
`;
