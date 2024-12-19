import { ApolloLink, HttpLink, from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { createErrorLink } from '../utils';
import { PUBLIC_GATEWAY_URL } from '@/config/app';
import Cookies from 'js-cookie';

export const WOO_SESSION_KEY = 'woo-session';

/**
 * Apollo Link to update the WooCommerce session token.
 * This link captures the session token from the response headers and stores it in cookies.
 */
export const wooSessionUpdater = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const session = context.response?.headers.get('woocommerce-session');

    if (session) {
      if (session === 'false') {
        // Remove session data if the session is destroyed
        Cookies.remove(WOO_SESSION_KEY);
      } else if (!Cookies.get(WOO_SESSION_KEY)) {
        // Store new session token if it doesn't exist
        Cookies.set(WOO_SESSION_KEY, session, { expires: 7 });
      }
    }

    return response;
  }),
);

// Create an HTTP link for Apollo Client
const httpLink = new HttpLink({
  uri: PUBLIC_GATEWAY_URL,
});

/**
 * Function to create an Apollo Client instance with SSR support.
 */
export const makeClient = () => {
  return new NextSSRApolloClient({
    ssrMode: true,
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),
    link: from([
      wooSessionUpdater,
      createErrorLink(),
      new SSRMultipartLink({ stripDefer: true }),
      httpLink,
    ]),
  });
};
