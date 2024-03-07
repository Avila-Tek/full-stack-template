/* eslint-disable turbo/no-undeclared-env-vars */
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * @see https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    // signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        try {
          // const { data } = await getClient().mutate({
          //   mutation: SIGN_IN,
          //   variables: {
          //     data: {
          //       email: credentials?.email,
          //       password: credentials?.password,
          //     },
          //   },
          // });
          // if (data) {
          //   return data.signIn;
          // } else {
          //   return null;
          // }
          //   return null;
        } catch (err) {
          console.error((err as any)?.networkError?.result?.errors);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      (token as any).user = JSON.stringify(user);
      console.log(user, token);
      return token;
    },
    async session({ session, token }) {
      session.user = JSON.parse((token as any).user);
      console.log(token, session);
      return session;
    },
  },
};
