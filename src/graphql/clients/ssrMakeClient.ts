import { from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import {
  createErrorLink,
  defaultHttpLink,
  sessionCreatorLink,
  sessionUpdaterLink,
} from '../utils';

export const ssrMakeClient = () => {
  return new NextSSRApolloClient({
    ssrMode: true,
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),
    link: from([
      sessionCreatorLink(),
      sessionUpdaterLink,
      createErrorLink(),
      new SSRMultipartLink({ stripDefer: true }),
      defaultHttpLink,
    ]),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
};
