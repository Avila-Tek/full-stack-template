import { Schema, Types } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export interface ISession {
  _id?: any;
  user: Types.ObjectId;
  token: string;
  device: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const sessionSchema = new Schema<ISession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    token: {
      type: String,
      trim: true,
    },
    device: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

convertSchemaToGraphQL(sessionSchema, 'Session', schemaComposer);
