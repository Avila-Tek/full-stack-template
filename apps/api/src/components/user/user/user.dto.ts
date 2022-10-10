import { UserTC } from './user.model';

export const UserType = UserTC.getTypeName();
export const UserTypePlural = UserTC.getTypePlural().getTypeName();
export const UserTypeNotNull = UserTC.getTypeNonNull().getTypeName();
