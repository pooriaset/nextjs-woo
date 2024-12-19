import { PUBLIC_GATEWAY_URL } from '@/config/app';
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies } from 'next/headers';

export const { getClient } = registerApolloClient(() => {
  const cookiesStore = cookies();

  const httpLink = new HttpLink({
    uri: `${process.env.__NEXT_PRIVATE_ORIGIN}${PUBLIC_GATEWAY_URL}`,
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
      },
    },
  });
});
