import { schemaComposer } from 'graphql-compose';
import { User, UserTC } from './user.model';

const userQueries = {
  user: UserTC.mongooseResolvers.findOne(),
  users: UserTC.mongooseResolvers.findMany(),
};

const userMutations = {
  createUser: UserTC.mongooseResolvers.createOne(),
  updateUser: UserTC.mongooseResolvers.updateOne(),
};

export { userQueries, userMutations };
