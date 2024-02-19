import type { z } from 'zod';
import { Schema, type Types, type Document } from 'mongoose';
import { phoneDefinition, userDefinition } from './user.dto';

export type IUser = z.infer<typeof userDefinition>;

export type IPhone = z.infer<typeof phoneDefinition>;

export type UserDocument = IUser & Document<Types.ObjectId, any, IUser>;

export const userSchema = new Schema<IUser, UserDocument>(
  {
    name: {
      type: String,
      required: [true, ''],
      trim: true,
    },
    email: {
      type: String,
      required: [true, ''],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, ''],
    },
  },
  { timestamps: true }
);
