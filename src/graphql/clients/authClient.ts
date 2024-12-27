import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';

import { PUBLIC_GATEWAY_URL } from '@/config/app';
import {
  createErrorLink,
  sessionCreatorLink,
  sessionUpdaterLink,
} from '../utils';

export const authClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: from([
    sessionCreatorLink(),
    sessionUpdaterLink,
    createErrorLink(),
    new HttpLink({
      uri: PUBLIC_GATEWAY_URL,
    }),
  ]),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
});
