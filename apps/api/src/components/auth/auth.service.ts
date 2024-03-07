import jwt from 'jsonwebtoken';
import { TSignInInput } from './auth.dto';

/**
 * @async
 * @function
 * @description This function mocks user authentication using a JWT
 * @implements TSignInInput
 * @listens auth.controller:signIn
 * @param data {TSignInInput}
 * @requires jsonwebtoken
 * @returns {object} Object with user object and its token as a string
 * @see user.model
 * @since 1.0.0
 * @summary Sign In
 * @todo Get user from database
 * @version 1
 */

async function signIn(data: TSignInInput) {
  const user = {
    _id: '6553f84c18a72845d4ce631f',
    name: 'Jose',
    email: data.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const token = jwt.sign(user, process.env.JWT_SECRET!);
  return {
    user,
    token,
  };
}

export const authService = Object.freeze({
  signIn,
});
