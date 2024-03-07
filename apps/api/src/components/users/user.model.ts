import { model } from 'mongoose';
import { hash } from 'argon2';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserDocument, userSchema } from '@avila-tek/models';

/**
 * @async
 * @function
 * @description Hashes password with module argon2 before saving it in database every time it is modified
 * @listens userSchema:save
 * @param next {CallbackWithoutResultAndOptionalError}
 * @requires argon2
 * @since 1.0.0
 * @summary Hashes password
 * @version 1
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = (await hash(this.password!, {})).toString();
  next();
});

export const User = model('User', userSchema);
export const UserTC = composeMongoose<UserDocument>(User as any);
