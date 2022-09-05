import { schemaComposer } from 'graphql-compose';
import {
  ChangePasswordInput,
  ResetPasswordInfo,
  ResetPasswordInput,
  SignInInput,
  SignInType,
  SignOutType,
  TChangePasswordInput,
  TResetPasswordInput,
  TSignInInput,
} from './auth.dto';
import { UserType } from '../user';
import * as authService from './auth.service';

const cookieConfig = {
  secure: true,
  sameSite: 'none',
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
  domain: process.env.NODE_ENV === 'development' ? null : 'localhost', //! FIXME:
};

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
    const { user, token } = await authService.signIn(args.data);
    context.res.cookie('token', token, cookieConfig);
    return {
      user,
      token,
    };
  },
});

const signOut = schemaComposer.createResolver({
  name: 'SignOut',
  kind: 'mutation',
  description: 'Sign Out an user from the app',
  type: SignOutType,
  args: {},
  async resolve({ context }) {
    context.res.clearCookie('token', cookieConfig);
    return { success: true };
  },
});

const currentUser = schemaComposer.createResolver({
  name: 'currentUser',
  kind: 'query',
  description: 'Return the user object based on the token',
  type: UserType,
  args: {},
  async resolve({ context }) {
    const { token }: { token: string } = context.req.cookies;
    const user = authService.currentUser(token);
    return user;
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
        context?.req?.headers ?? {}
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

export const authQueries = { currentUser };
export const authMutations = { changePassword, resetPassword, signOut, signIn };
