import { model } from 'mongoose';
import { hash } from 'argon2';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserDocument, userSchema } from '@avila-tek/models';

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = (await hash(this.password!, {})).toString();
  next();
});

export const User = model('User', userSchema);
export const UserTC = composeMongoose<UserDocument>(User as any);
