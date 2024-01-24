import { z } from 'zod';

export const ZUser = z.object({
  email: z.string().email().nonempty(),
});

export type TUser = z.infer<typeof ZUser>;

export interface IPhone {
  countryCode: string;
  number: string;
}
export interface IUser {
  _id?: string;
  mail: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: Partial<IPhone>;
  emailVerify: boolean;
  dni: string;
}
