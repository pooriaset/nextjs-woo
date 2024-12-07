import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { httpLink } from '../utils';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: from([httpLink]),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
});
