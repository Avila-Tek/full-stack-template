export interface MongooseModel {
  _id?: string;
  active?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type UserTypeEnum = 'client' | 'superadmin';

export type DniTypeEnum = 'V' | 'E' | 'J' | 'G' | 'P' | 'N/A';

export type PermissionOptionEnum = 'create' | 'read' | 'update' | 'delete';

export interface Permission extends MongooseModel {
  name: string;
  key: string;
  options: Array<PermissionOptionEnum>;
}

export interface Session extends MongooseModel {
  user: string | User;
  token: string;
  device: string;
}

export interface User extends MongooseModel {
  slug?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  locale?: string;
  permission: Array<Permission>;
  userType: UserTypeEnum;
  emailVerify: boolean;
  resetTokenValidity?: Date;
  resetToken?: string;
  dni?: string;
  dniType?: DniTypeEnum;
  commission?: number;
  sessions?: Array<Session>;
}
