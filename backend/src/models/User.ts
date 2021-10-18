import { Schema, Document, model, Types } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import slugs from 'slugs';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  slug?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  birthDate?: Date;
  phones?: Array<string>;
  privilege: number;
  active?: boolean;
  photo?: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema(
  {
    slug: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Por favor ingrese un apellido'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Por favor ingrese un correo electrónico'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    phones: [{ type: String, default: '-', trim: true }],
    privilege: {
      type: Number,
      default: 0,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('firstName') || !this.isModified('lastName')) {
    return next();
  }
  this.slug = slugs(`${this.firstName} ${this.lastName}`);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`);
  const withSlugs = await (this as any).constructor.find({
    slug: slugRegEx,
  });
  if ((withSlugs as Array<UserDocument>).length) {
    this.slug = `${this.slug}-${withSlugs.length + 1}`;
  }
  next();
});

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = model<UserDocument>('User', userSchema);
export const UserTC = composeMongoose(User);
