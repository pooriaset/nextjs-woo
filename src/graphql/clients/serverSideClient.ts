import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies } from 'next/headers';
import { defaultHttpLink } from '../utils';

export const { getClient } = registerApolloClient(() => {
  const cookiesStore = cookies();

  const httpLink = new HttpLink({
    ...defaultHttpLink.options,
    headers: {
      cookie: cookiesStore.toString(),
      'X-Server-Side': 'true',
    },
  });

  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: from([httpLink]),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
});
