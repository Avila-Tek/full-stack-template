import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SIGN_IN($data: SignInInput) {
    signIn(data: $data) {
      token
      user {
        _id
        email
        name
        createdAt
        updatedAt
      }
    }
  }
`;
