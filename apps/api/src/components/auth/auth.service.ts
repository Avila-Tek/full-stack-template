import jwt from 'jsonwebtoken';
import { TSignInInput } from './auth.dto';

//! THIS IS MOCK IMPLEMENTATION
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
