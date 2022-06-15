import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import browser from 'browser-detect';
import { schemaComposer } from 'graphql-compose';
import { v4 as uuid } from 'uuid';
import { NoSentryError } from '../../lib/NoSentryError';
import { sendResetPasswordEmail } from '../../lib/email';
import { TChangePasswordInput, TSignInInput } from './auth.dto';
import * as userService from '../user/user.service';

export async function signIn(body: TSignInInput) {
  const user = await userService.findOne({ email: body.email, active: true });
  if (!user) {
    throw new NoSentryError(
      `No se ha encontrado a un usuario con correo ${body.email}`
    );
  }
  const compare = await bcrypt.compare(body.password, user.password);
  if (!compare) {
    throw new NoSentryError(`La contraseña es incorrecta ${body.email}`);
  }
  const token = jwt.sign(
    JSON.stringify({
      id: user._id,
    }),
    process.env.SECRET
  );
  return {
    user,
    token,
  };
}

export async function currentUser(token: string) {
  if (!token) {
    return null;
  }
  const payload = jwt.decode(token) as { id: string };
  const user = await userService.findOne({ _id: payload.id, active: true });
  return user;
}

export async function resetPassword(email: string, headers: any) {
  const browserData = browser(headers['user-agent']);
  const user = await userService.findOne({ email }, '-password');
  if (!user) {
    throw new NoSentryError(
      `El usuario con correo ${email} no esta registrado`
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
}

export async function changePassword(data: TChangePasswordInput) {
  const user = await userService.findOne({
    resetToken: data.token,
    resetTokenExpiry: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    throw new NoSentryError(`El token ha expirado, debe solicitar uno nuevo`);
  }
  user.password = data.password;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
}
