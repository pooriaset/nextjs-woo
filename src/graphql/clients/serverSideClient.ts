import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { createAuthLink } from './clientSideMakeClient';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: from([createAuthLink(), httpLink]),
  });
});
