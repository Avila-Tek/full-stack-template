import { UserTC } from './user.model';

export const UserType = UserTC.getTypeName();
export const UserTypePlural = UserTC.getTypePlural().getTypeName();
export const UserTypeNotNull = UserTC.getTypeNonNull().getTypeName();

// Create One
export const CreateOneUserInput = UserTC.mongooseResolvers
  .createOne()
  .getArgs()
  .record.type.getTypeName();

// Find One
export const UserFindOneFilterInput = UserTC.mongooseResolvers
  .findOne()
  .getArgs()
  .filter.type.getTypeNonNull();
export const UserFindOneSortInput = UserTC.mongooseResolvers
  .findOne()
  .getArgs()
  .sort.type.getTypeName();

// Find Many
export const UserFindManyFilterInput = UserTC.mongooseResolvers
  .findMany()
  .getArgs()
  .filter.type.getTypeName();
export const UserFindManySortInput = UserTC.mongooseResolvers
  .findMany()
  .getArgs()
  .sort.type.getTypeName();

// Update One
export const UserUpdateOneFilterInput = UserTC.mongooseResolvers
  .updateOne()
  .getArgs()
  .filter.type.getTypeName();
export const UserUpdateOneInput = UserTC.mongooseResolvers
  .updateOne()
  .getArgs()
  .record.type.getTypeName();
