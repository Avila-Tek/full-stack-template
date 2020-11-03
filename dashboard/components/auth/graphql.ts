import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SIGN_IN($data: SignInInput!) {
    signIn(data: $data) {
      _id
      firstName
      lastName
      email
      privilege
      active
      photo
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SIGN_OUT {
    signOut {
      success
    }
  }
`;

export const CURRENT_USER = gql`
  query CURRENT_USER {
    currentUser {
      _id
      slug
      firstName
      lastName
      email
      privilege
      active
      photo
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      success
      err
    }
  }
`;
