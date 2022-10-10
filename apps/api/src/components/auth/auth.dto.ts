import { UserType } from '../user/user/user.dto';

type TPermissionInput = {
  name: string;
  key: string;
  options: Array<string>;
};

export type TCreateUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dni: string;
  dniType: string;
  permissions?: Array<TPermissionInput>;
  userType: string;
};

export const CreateUserInput = `
  input CreateUser {
    email: String!
    password: String
    firstName: String!
    lastName: String
    dni: String!
    dniType: String!
    permissions: [PermissionInput!]
    userType: String
  }

  input PermissionInput {
    name: String
    key: String
    options: [String!]
  }

`;

export type TSignUpInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dni: string;
  dniType: string;
};

export const SignUpInput = `
  input SignUpInput {
    email: String
    password: String
    firstName: String
    lastName: String
    dni: String
    dniType: String
  }
`;

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

export const CurrentUserType = `
  type CurrentUserType {
    user: ${UserType}
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
