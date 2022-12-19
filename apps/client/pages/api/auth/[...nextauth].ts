import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import Auth0Provider from 'next-auth/providers/auth0';
import { createApolloClient } from '../../../hooks/useApollo';
import { SIGN_IN } from '../../../graphql/mutation';

const apolloClient = createApolloClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/sign-up',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { data, errors } = await apolloClient.mutate({
          mutation: SIGN_IN,
          variables: {
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          },
        });
        if (Array.isArray(errors) && errors.length > 0) {
          throw new Error(errors[0].message);
        }
        if (data && data?.signIn && data?.signIn?.user) {
          return data?.signIn?.user ?? null;
        }
        return null;
      },
    }),
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = JSON.stringify(user);
      }
      return token;
    },
    async session({ session, token }) {
      session.user = JSON.parse(token.user as string);
      return session;
    },
  },
};

export default NextAuth(authOptions);
