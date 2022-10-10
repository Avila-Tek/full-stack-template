import { authQueries } from '../components/auth/auth.controller';
import { userQueries } from '../components/user/user/user.controller';

const Query = {
  ...authQueries,
  ...userQueries,
};

export default Query;
