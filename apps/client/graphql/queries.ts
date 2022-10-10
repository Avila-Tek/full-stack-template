import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './fragments';

export const CURRENT_USER = gql`
  query CURRENT_USER {
    currentUser {
      user {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;
