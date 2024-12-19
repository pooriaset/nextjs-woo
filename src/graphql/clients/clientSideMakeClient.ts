import { ApolloLink, HttpLink, from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { createErrorLink } from '../utils';
import { PUBLIC_GATEWAY_URL } from '@/config/app';

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const WOO_SESSION_KEY = 'woo-session';

/**
 * Woo Session setter operation.
 * If we have a session token in localStorage, add it to the GraphQL request as a Session header.
 */
export const wooSessionSetter = new ApolloLink((operation, forward) => {
  /**
   * If session data exist in local storage, set value as session header.
   * Here we also delete the session if it is older than 7 days
   */
  const localStorageValue = localStorage.getItem(WOO_SESSION_KEY);
  const sessionData = localStorageValue ? JSON.parse(localStorageValue) : null;

  if (sessionData && sessionData.token && sessionData.createdTime) {
    const { token, createdTime } = sessionData;

    // Check if the token is older than 7 days
    if (Date.now() - createdTime > SEVEN_DAYS) {
      // If it is, delete it
      localStorage.removeItem(WOO_SESSION_KEY);
      localStorage.setItem('woocommerce-cart', JSON.stringify({}));
    } else {
      // If it's not, use the token
      operation.setContext(() => ({
        headers: {
          'woocommerce-session': `Session ${token}`,
        },
      }));
    }
  }

  return forward(operation);
});

/**
 * Woo Session updater operation.
 *
 * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
 */
export const wooSessionUpdater = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    const session = headers.get('woocommerce-session');

    if (session) {
      if ('false' === session) {
        // Remove session data if session destroyed.
        localStorage.removeItem(WOO_SESSION_KEY);
        // Update session new data if changed.
      } else if (!localStorage.getItem(WOO_SESSION_KEY)) {
        localStorage.setItem(
          WOO_SESSION_KEY,
          JSON.stringify({ token: session, createdTime: Date.now() }),
        );
      }
    }

    return response;
  }),
);

const httpLink = new HttpLink({
  uri: PUBLIC_GATEWAY_URL,
});

export const makeClient = () => {
  return new NextSSRApolloClient({
    ssrMode: true,
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),
    link: from([
      wooSessionSetter,
      wooSessionUpdater,
      createErrorLink(),
      new SSRMultipartLink({
        stripDefer: true,
      }),
      httpLink,
    ]),
  });
};
