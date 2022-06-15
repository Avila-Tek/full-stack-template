import type { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { IUser, User } from './user.model';

export async function findOne(
  filter?: FilterQuery<IUser>,
  projection?: ProjectionType<IUser> | null,
  options?: QueryOptions<IUser> | null
) {
  return User.findOne(filter, projection, options);
}
