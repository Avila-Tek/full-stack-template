import { z } from 'zod';

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TSignInInput = z.infer<typeof signInInput>;

export const SignInPayload = `
type SignInPayload {
  user: User!
  token: String!
}`;

export const SignInInput = `
input SignInInput {
  email: String!
  password: String!
}`;
