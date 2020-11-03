import { UserTC } from '../models';

const Query = {
  user: UserTC.mongooseResolvers.findOne(),
  users: UserTC.mongooseResolvers.findMany(),
};

export default Query;
