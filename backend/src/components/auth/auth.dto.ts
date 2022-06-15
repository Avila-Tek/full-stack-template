import { UserType } from '../user';

export type TSignInInput = {
  email: string;
  password: string;
};

export const SignInInput = `
  input SignInInput {
    email: String!
    password: String!
  }
`;

export const SignInType = `
  type SignInType {
    user: ${UserType}
    token: String
  }
`;

export const SignOutType = `
  type SignOutType {
    success: Boolean!
  }
`;

export type TResetPasswordInput = {
  email: string;
};

export const ResetPasswordInput = `
  input ResetPasswordInput {
    email: String!
  }
`;

export const ResetPasswordInfo = `
  type ResetPasswordInfo {
    success: Boolean!
    err: String
  }
`;

export type TChangePasswordInput = {
  token: string;
  password: string;
};

export const ChangePasswordInput = `
  input ChangePasswordInput {
    token: String!
    password: String!
  }
`;
