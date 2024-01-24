import { model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserDocument, userSchema } from '@avila-tek/models/src/user';

export const User = model('User', userSchema);
export const UserTC = composeMongoose<UserDocument>(User as any);
