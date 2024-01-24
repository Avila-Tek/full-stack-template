import { userMutations } from '@/components/users/user.controller';
import { authMutations } from '@/components/auth/auth.controller';

export const Mutation = {
  ...userMutations,
  ...authMutations,
};
