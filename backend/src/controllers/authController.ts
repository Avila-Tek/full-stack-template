/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import browser from 'browser-detect';
import { v4 as uuid } from 'uuid';
import { sendResetPasswordEmail } from '../lib/email';
import { User, UserTC } from '../models/User';
import schemaComposer from '../graphql/schemaComposer';

type TSignInInput = {
  email: string;
  password: string;
};

const SignInInput = `
  input SignInInput {
    email: String!
    password: String!
  }
`;

export const signIn = schemaComposer.createResolver<
  any,
  {
    data: TSignInInput;
  }
>({
  name: 'signIn',
  kind: 'mutation',
  description: 'Sign In an user to the app',
  type: UserTC.getType(),
  args: {
    data: SignInInput,
  },
  async resolve({ args, context }) {
    const user = await User.findOne({ email: args?.data?.email, active: true });
    if (!user) {
      throw new Error(
        `No se ha encontrado a un usuario con correo ${args?.data?.email}`
      );
    }
    const compare = await bcrypt.compare(args?.data?.password, user.password);
    if (!compare) {
      throw new Error(`La contraseña es incorrecta ${args?.data?.email}`);
    }
    const token = jwt.sign(
      JSON.stringify({
        id: user._id,
      }),
      process.env.SECRET
    );
    context.res.cookie('token', token, {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : 'localhost', //! FIXME:
    });
    return user;
  },
});

const SignOutType = `
  type SignOutType {
    success: Boolean!
  }
`;

export const signOut = schemaComposer.createResolver({
  name: 'SignOut',
  kind: 'mutation',
  description: 'Sign Out an user from the app',
  type: SignOutType,
  args: {},
  async resolve({ context }) {
    if (!(context?.req?.cookies?.token ?? false)) {
      return { success: false };
    }
    context.res.clearCookie('token', {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 yr in ms
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : 'localhost', //! FIXME:
    });
    return { success: true };
  },
});

export const currentUser = schemaComposer.createResolver({
  name: 'currentUser',
  kind: 'query',
  description: 'Return the user object based on the token',
  type: UserTC.getType(),
  args: {},
  async resolve({ context }) {
    const { token }: { token: string } = context.req.cookies;
    if (!token) {
      return null;
    }
    const payload = jwt.decode(token) as { id: string };
    const user = User.findOne({ _id: payload.id, active: true });
    return user;
  },
});

type TResetPasswordInput = {
  email: string;
};

const ResetPasswordInput = `
  input ResetPasswordInput {
    email: String!
  }
`;

const ResetPasswordInfo = `
  type ResetPasswordInfo {
    success: Boolean!
    err: String
  }
`;

export const resetPassword = schemaComposer.createResolver<
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
      const browserData = browser(context?.req?.headers?.['user-agent']);
      const user = await User.findOne({ email: args?.data?.email });
      if (!user) {
        throw new Error(
          `El usuario con correo ${args?.data?.email} no esta registrado`
        );
      }
      user.resetToken = uuid();
      user.resetTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in ms
      await Promise.all([
        user.save(),
        sendResetPasswordEmail({
          user,
          os: browserData,
          url: `${process.env.CLIENT_URL}/reset-password/${user?.resetToken}`,
        }),
      ]);
      return { success: true };
    } catch (err) {
      return { err: err.message, success: false };
    }
  },
});

type TChangePasswordInput = {
  token: string;
  password: string;
};

const ChangePasswordInput = `
  input ChangePasswordInput {
    token: String!
    password: String!
  }
`;

export const changePassword = schemaComposer.createResolver<
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
      const user = await User.findOne({
        resetToken: args?.data?.token,
        resetTokenExpiry: {
          $gt: Date.now(),
        },
      });
      if (!user) {
        throw new Error(`El token ha expirado`);
      }
      user.password = args?.data?.password;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
      return { success: true };
    } catch (err) {
      return { success: false, err: err.message };
    }
  },
});
