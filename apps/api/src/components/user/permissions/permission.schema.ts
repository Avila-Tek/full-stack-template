import { Schema } from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { convertSchemaToGraphQL } from 'graphql-compose-mongoose';

export type PermissionOptionEnum = 'create' | 'read' | 'update' | 'delete';

export interface IPermission {
  _id?: any;
  name: string;
  key: string;
  options: Array<PermissionOptionEnum>;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const permissionSchema = new Schema<IPermission>(
  {
    name: {
      type: String,
      trim: true,
    },
    key: {
      type: String,
      trim: true,
    },
    options: [
      {
        type: String,
        enum: ['create', 'read', 'update', 'delete'],
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

convertSchemaToGraphQL(permissionSchema, 'Permission', schemaComposer);
