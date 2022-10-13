import { gql } from '@apollo/client';

export const UserFragment = gql`
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
