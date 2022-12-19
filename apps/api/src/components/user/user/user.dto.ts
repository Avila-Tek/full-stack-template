import { UserTC } from './user.model';

export const UserType = UserTC.getTypeName();
export const UserTypePlural = UserTC.getTypePlural().getTypeName();
export const UserTypeNotNull = UserTC.getTypeNonNull().getTypeName();

// Create One

const UserCreateInput = UserTC.mongooseResolvers
  .createOne()
  .getArgs()
  .record.type.getTypeName();
// Find One
const UserFindOneInput = UserTC.mongooseResolvers
  .findOne()
  .getArgs()
  .filter.type.getTypeName();
// Update One
const UserUpdateOneFilterInput = UserTC.mongooseResolvers
  .updateOne()
  .getArgs()
  .filter.type.getTypeName();
const UserUpdateOneInput = UserTC.mongooseResolvers
  .updateOne()
  .getArgs()
  .record.type.getTypeName();
