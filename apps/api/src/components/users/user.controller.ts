import { UserTC } from './user.model';

export const userQueries = {
  user: UserTC.mongooseResolvers.findOne(),
  userPagination: UserTC.mongooseResolvers.pagination(),
};

export const userMutations = {
  createUser: UserTC.mongooseResolvers.createOne(),
  updateUser: UserTC.mongooseResolvers.updateOne(),
};
