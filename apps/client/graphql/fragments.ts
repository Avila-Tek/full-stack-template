import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    firstName
    lastName
    userType
    email
    password
    locale
    dni
    dniType
    active
  }
`;
