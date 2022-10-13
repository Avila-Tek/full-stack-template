import 'next-auth/jwt';

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's role. */
    _id: string;
    email: string;
    name: string;
    privilege: string;
    company: string;
  }
}
