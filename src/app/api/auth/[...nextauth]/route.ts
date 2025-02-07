import { SIGN_IN_PAGE_PATHNAME } from '@/config/routes';
import { getClient } from '@/graphql/clients/serverSideClient';
import { LOGIN_USER_MUTATION } from '@/graphql/queries/auth';
import { LoginUserMutation } from '@/graphql/types/graphql';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    maxAge: 1 * 24 * 60 * 60,
  },
  pages: {
    signIn: SIGN_IN_PAGE_PATHNAME,
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { data } = await getClient().query<LoginUserMutation>({
          query: LOGIN_USER_MUTATION,
          variables: credentials,
        });

        if (data?.login?.user) {
          return {
            ...data.login?.user,
            accessToken: data.login.accessToken!,
            refreshToken: data.login.refreshToken!,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
