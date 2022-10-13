import slugs from 'slugs';
import { hash } from 'argon2';
import mongooseAlgolia from 'mongoose-algolia';
import { Schema, Document, Types, Model, model, models } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { IPermission, permissionSchema } from '../permissions';
import { ISession, sessionSchema } from '../sessions';

export type UserTypeEnum = 'client' | 'superadmin';

export type DniTypeEnum = 'V' | 'E' | 'J' | 'G' | 'P' | 'N/A';

export interface IUser {
  _id?: any;
  slug?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  locale?: string;
  permission: Array<IPermission>;
  userType: UserTypeEnum;
  emailVerify?: boolean;
  resetTokenValidity?: Date;
  resetToken?: string;
  dni?: string;
  dniType?: DniTypeEnum;
  sessions?: Array<ISession>;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = Document<Types.ObjectId, any, IUser> & IUser;

const userSchema = new Schema<IUser>(
  {
    slug: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Por favor ingrese un correo electrónico'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Por favor ingrese una contraseña'],
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
    locale: {
      type: String,
      default: 'es',
      trim: true,
    },
    permission: [permissionSchema],
    userType: {
      type: String,
      enum: ['client', 'superadmin'],
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    resetTokenValidity: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
    dni: {
      type: String,
      trim: true,
    },
    dniType: {
      type: String,
      enum: ['V', 'E', 'J', 'G', 'P', 'N/A'],
    },
    sessions: [sessionSchema],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = (await hash(this.password, {})).toString();
  next();
});

// userSchema.plugin(mongooseAlgolia, {
//   appId: process.env.ALGOLIA_APP_ID,
//   apiKey: process.env.ALGOLIA_PRIVATE_KEY,
//   indexName: 'users',
//   selector: '-password -createdAt -updatedAt',
//   debug: true,
// });

export const User =
  (models.User as Model<UserDocument> & {
    SyncToAlgolia?: any;
    SetAlgoliaSettings?: any;
  }) ||
  model<
    UserDocument,
    Model<UserDocument> & {
      SyncToAlgolia?: any;
      SetAlgoliaSettings?: any;
    }
  >('User', userSchema);

// User.SyncToAlgolia();

// User.SetAlgoliaSettings({
//   searchableAttributes: ['name', 'email'],
// });

export const UserTC = composeMongoose(User);
