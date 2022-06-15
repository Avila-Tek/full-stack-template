import { authMutations } from '../components/auth';
import { userMutations } from '../components/user';

const Mutation = {
  ...authMutations,
  ...userMutations,
};

export default Mutation;
