import { Document, Model, Schema, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { algoliaIntegration } from '@avila-tek/mongoose-algolia';
// import type { TStaticMethods } from '@avila-tek/mongoose-algolia';

type TStaticMethods = {
  syncToAlgolia(): void;
  setAlgoliaSettings(settings: any): void;
};

export interface IUser {
  email: string;
  name: string;
  password: string;
}

export type UserModel = Model<IUser> & TStaticMethods;

export type UserDocument = Document<Types.ObjectId, any, IUser> & IUser;

const userSchema = new Schema<IUser, UserModel, TStaticMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// userSchema.plugin(algoliaIntegration, {
//   appId: '',
//   apiKey: '',
//   indexName: 'users',
// });

export const User = model<IUser, UserModel>('User', userSchema);
export const UserTC = composeMongoose<UserDocument>(User as any);

// User.setAlgoliaSettings({
//   searchableAttributes: ['name', 'properties', 'shows', 'age'],
// });
