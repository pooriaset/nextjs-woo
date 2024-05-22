import { ApolloLink, HttpLink, from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { getSessionToken } from '@/services/common';
import { setContext } from '@apollo/client/link/context';

const createSessionLink = () => {
  return setContext(async () => {
    const headers: Record<string, string> = {};
    const sessionToken = await getSessionToken();

    if (sessionToken) {
      headers['woocommerce-session'] = `Session ${sessionToken}`;

      return { headers };
    }

    return {};
  });
};

const updateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    const oldSessionToken = localStorage.getItem(
      process.env.NEXT_PUBLIC_WOOCOMMERCE_SESSION_KEY as string,
    );
    const sessionToken = headers.get('woocommerce-session');
    if (sessionToken) {
      if (oldSessionToken !== sessionToken) {
        localStorage.setItem(
          process.env.NEXT_PUBLIC_WOOCOMMERCE_SESSION_KEY as string,
          sessionToken,
        );
      }
    }

    return response;
  });
});
export const makeClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  });

  return new NextSSRApolloClient({
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),

    link: from([
      createSessionLink(),
      updateLink,
      ...(typeof window === 'undefined'
        ? [
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ]
        : [httpLink]),
    ]),
  });
};
