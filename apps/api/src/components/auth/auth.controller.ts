import browserDetect from 'browser-detect';
import { schemaComposer } from 'graphql-compose';
import {
  ChangePasswordInput,
  ResetPasswordInfo,
  ResetPasswordInput,
  SignInInput,
  SignInType,
  SignOutType,
  SignUpInput,
  TChangePasswordInput,
  TResetPasswordInput,
  TSignInInput,
  TSignUpInput,
  TCreateUserInput,
  CreateUserInput,
  CurrentUserType,
} from './auth.dto';
import { UserType } from '../user/user/user.dto';
import * as authService from './auth.service';

const cookieConfig =
  process.env.NODE_ENV === 'development'
    ? {
        maxAge: 1000 * 60 * 60 * 24 * 365,
      }
    : {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        domain: 'localhost',
      };

const createUser = schemaComposer.createResolver<
  any,
  {
    data: TCreateUserInput;
  }
>({
  name: 'createUser',
  kind: 'mutation',
  description: 'Create new user mechanic/admin',
  type: UserType,
  args: {
    data: CreateUserInput,
  },
  async resolve({ args }) {
    const user = await authService.createUser(args.data);
    return user;
  },
});

const signIn = schemaComposer.createResolver<
  any,
  {
    data: TSignInInput;
  }
>({
  name: 'signIn',
  kind: 'mutation',
  description: 'Sign In an user to the app',
  type: SignInType,
  args: {
    data: SignInInput,
  },
  async resolve({ args, context }) {
    const browser = browserDetect(context.req.headers['user-agent']);
    const { user, token } = await authService.signIn(args.data, browser);
    return { user, token };
  },
});

const signUp = schemaComposer.createResolver<
  any,
  {
    data: TSignUpInput;
  }
>({
  name: 'signUp',
  kind: 'mutation',
  description: 'Sign Up an user to the app',
  type: SignInType,
  args: {
    data: SignUpInput,
  },
  async resolve({ args, context }) {
    const browser = browserDetect(context.req.headers['user-agent']);
    const { user, token } = await authService.signUp(args.data, browser);
    context.res.cookie('token', token, cookieConfig);
    return { user, token };
  },
});

const signUpWithoutToken = schemaComposer.createResolver<
  any,
  {
    data: TSignUpInput;
  }
>({
  name: 'signUpWithoutToken',
  kind: 'mutation',
  description: 'Admin Signing Up an user to the app',
  type: SignInType,
  args: {
    data: SignUpInput,
  },
  async resolve({ args }) {
    const user = await authService.signUpWithoutToken(args.data);
    return { user };
  },
});

const signOut = schemaComposer.createResolver({
  name: 'SignOut',
  kind: 'mutation',
  description: 'Sign Out an user from the app',
  type: SignOutType,
  args: {},
  async resolve({ context }) {
    // TODO: Eliminar la sesion del usuario
    context.res.clearCookie('token', cookieConfig);
    return { success: true };
  },
});

const currentUser = schemaComposer.createResolver({
  name: 'currentUser',
  kind: 'query',
  description: 'Return the user object based on the token',
  type: CurrentUserType,
  args: {},
  async resolve({ context }) {
    const token =
      context.req.cookies?.token ?? context.req.headers?.['x-token'];
    const { user } = await authService.currentUser(token);
    return { user };
  },
});

const resetPassword = schemaComposer.createResolver<
  any,
  {
    data: TResetPasswordInput;
  }
>({
  name: 'resetPassword',
  type: ResetPasswordInfo,
  description: 'Reset Password',
  kind: 'mutation',
  args: {
    data: ResetPasswordInput,
  },
  async resolve({ args, context }) {
    try {
      await authService.resetPassword(
        args.data.email,
        browserDetect(context.req.headers['user-agent'])
      );
      return { success: true };
    } catch (err) {
      return { err: err.message, success: false };
    }
  },
});

const changePassword = schemaComposer.createResolver<
  any,
  {
    data: TChangePasswordInput;
  }
>({
  name: 'changePassword',
  type: ResetPasswordInfo,
  description: 'Change Password',
  kind: 'mutation',
  args: {
    data: ChangePasswordInput,
  },
  async resolve({ args }) {
    try {
      await authService.changePassword(args.data);
      return { success: true };
    } catch (err) {
      return { success: false, err: err.message };
    }
  },
});

export const authQueries = {
  currentUser,
};

export const authMutations = {
  changePassword,
  resetPassword,
  signOut,
  signIn,
  signUp,
  createUser,
};
