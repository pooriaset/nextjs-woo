import { HttpLink, from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { createErrorLink } from '../utils';
import { PUBLIC_GATEWAY_URL } from '@/config/app';

const httpLink = new HttpLink({
  uri: PUBLIC_GATEWAY_URL,
});

export const makeClient = () => {
  return new NextSSRApolloClient({
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),
    link: from([
      createErrorLink(),
      ...(typeof window === 'undefined'
        ? [
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ]
        : [httpLink]),
    ]),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
};
