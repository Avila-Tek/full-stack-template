import { authQueries } from '../components/auth';
import { userQueries } from '../components/user';

const Query = {
  ...authQueries,
  ...userQueries,
};

export default Query;
