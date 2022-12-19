import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: any;
      slug?: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      locale?: string;
      permission: Array<any>;
      userType: any;
      emailVerify?: boolean;
      resetTokenValidity?: Date;
      resetToken?: string;
      dni?: string;
      dniType?: any;
      sessions?: Array<any>;
      active?: boolean;
      createdAt?: Date;
      updatedAt?: Date;
    };
  }
}
