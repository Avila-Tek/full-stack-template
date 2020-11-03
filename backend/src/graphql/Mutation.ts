import { UserTC } from '../models';

const Mutation = {
  createUser: UserTC.mongooseResolvers.createOne(),
  updateUser: UserTC.mongooseResolvers.updateOne(),
};

export default Mutation;
