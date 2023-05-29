import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
/**
 * @see https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = { id: '1', name: 'Admin', email: 'admin@admin.com' };
        return user;
      },
    }),
  ],
};
