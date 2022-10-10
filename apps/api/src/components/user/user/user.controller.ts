import { UserTC } from './user.model';

const userQueries = {
  user: UserTC.mongooseResolvers.findOne(),
  users: UserTC.mongooseResolvers.findMany(),
  userPagination: UserTC.mongooseResolvers.pagination(),
};

const userMutations = {
  createUser: UserTC.mongooseResolvers.createOne(),
  updateUser: UserTC.mongooseResolvers.updateOne(),
};

export { userQueries, userMutations };
