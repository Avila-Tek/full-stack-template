import { gql } from '@apollo/client';
import { UserFragment } from './fragments';

export const CURRENT_USER = gql`
  query CURRENT_USER {
    currentUser {
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragment}
`;
