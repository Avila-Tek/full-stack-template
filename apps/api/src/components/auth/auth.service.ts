import jwt from 'jsonwebtoken';
import { verify } from 'argon2';
import { v4 as uuid } from 'uuid';
import { BrowserDetectInfo } from '../../types/browser';
import { NoSentryError, sendResetPasswordEmail } from '../../utils';
import { IPermission } from '../user/permissions';
import {
  TChangePasswordInput,
  TCreateUserInput,
  TSignInInput,
  TSignUpInput,
} from './auth.dto';
import * as userService from '../user/user/user.service';

export async function createUser(body: TCreateUserInput) {
  const _user = await userService.findOne({ email: body.email });
  if (_user) {
    throw new NoSentryError('');
  }
  const _permissions = body.permissions.map(
    (permission) =>
      ({
        name: permission.name,
        key: permission.key,
        options: permission.options,
      } as IPermission)
  ) as IPermission[];

  const user = await userService.create({
    ...body,
    dniType: userService.translateDniType(body.dniType),
    userType: userService.translateUserType(body.userType),
    emailVerify: false,
    permission: _permissions,
  });

  return user;
}

export async function signUp(
  body: TSignUpInput,
  _browser?: BrowserDetectInfo | null
) {
  const _user = await userService.findOne({ email: body.email });
  if (_user) {
    throw new NoSentryError('');
  }
  const user = await userService.create({
    ...body,
    dniType: userService.translateDniType(body.dniType),
    userType: 'client',
    emailVerify: false,
    permission: [],
  });

  const token = jwt.sign(
    JSON.stringify({
      id: user._id,
      privilege: user.userType,
    }),
    process.env.SECRET
  );

  await userService.updateOne(
    { _id: user._id },
    {
      $push: {
        sessions: [
          {
            user: user._id,
            token,
            device: `${_browser.os} ${_browser.name} ${_browser.version}`,
            active: true,
          },
        ],
      },
    }
  );

  return {
    user,
    token,
  };
}

export async function signUpWithoutToken(body: TSignUpInput) {
  const _user = await userService.findOne({ email: body.email });
  if (_user) {
    throw new NoSentryError('');
  }
  const user = await userService.create({
    ...body,
    dniType: userService.translateDniType(body.dniType),
    userType: 'client',
    emailVerify: false,
    permission: [],
  });

  return user;
}

export async function signIn(
  body: TSignInInput,
  _browser?: BrowserDetectInfo | null
) {
  const user = await userService.findOne({ email: body.email, active: true });
  if (!user) {
    throw new NoSentryError(
      `No se ha encontrado a un usuario con correo ${body.email}`
    );
  }
  const compare = await verify(user.password, body.password);

  if (!compare) {
    throw new NoSentryError(`La contraseña es incorrecta ${body.email}`);
  }
  const token = jwt.sign(
    JSON.stringify({
      id: user._id,
      privilege: user.userType,
    }),
    process.env.SECRET
  );

  await userService.updateOne(
    { _id: user._id },
    {
      $push: {
        sessions: [
          {
            user: user._id,
            token,
            device: `${_browser.os} ${_browser.name} ${_browser.version}`,
            active: true,
          },
        ],
      },
    }
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
  return { user };
}

export async function resetPassword(
  email: string,
  browserData: BrowserDetectInfo
) {
  const user = await userService.findOne({ email }, '-password');

  if (!user) {
    throw new NoSentryError(
      `El usuario con correo ${email} no esta registrado`
    );
  }
  user.resetToken = uuid();
  user.resetTokenValidity = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours in ms
  await Promise.all([
    user.save(),
    sendResetPasswordEmail({
      user,
      os: browserData,
      url: `${process.env.DASHBOARD_URL}/reset-password/${user?.resetToken}`,
    }),
  ]);
}

export async function changePassword(data: TChangePasswordInput) {
  const user = await userService.findOne({
    resetToken: data.token,
    resetTokenValidity: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    throw new NoSentryError(`El token ha expirado, debe solicitar uno nuevo`);
  }
  user.password = data.password;
  user.resetToken = undefined;
  user.resetTokenValidity = undefined;
  await user.save();
}
