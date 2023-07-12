import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './fragments';

export const USER_PAGINATION = gql`
  query USER_PAGINATION($page: Int, $perPage: Int) {
    userPagination(page: $page, perPage: $perPage) {
      items {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;
