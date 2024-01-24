import { schemaComposer } from 'graphql-compose';
import { authService } from '@/components/auth/auth.service';
import {
  TSignInInput,
  SignInPayload,
  SignInInput,
} from '@/components/auth/auth.dto';

const signIn = schemaComposer.createResolver<
  any,
  {
    data: TSignInInput;
  }
>({
  name: 'signIn',
  description:
    'This is the method used to sign in a user with email & password',
  type: SignInPayload,
  args: {
    data: SignInInput,
  },
  async resolve({ args }) {
    return authService.signIn(args.data);
  },
});

export const authMutations = Object.freeze({
  signIn,
});
