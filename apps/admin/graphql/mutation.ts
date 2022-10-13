import { gql } from '@apollo/client';
import { UserFragment } from './fragments';

export const SIGN_IN = gql`
  mutation SIGN_IN($data: SignInInput!) {
    signIn(data: $data) {
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragment}
`;
