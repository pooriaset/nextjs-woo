import { PUBLIC_GATEWAY_URL } from '@/config/app';
import { ApolloClient, ApolloLink, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import Cookies from 'js-cookie';
import { GET_CUSTOMER_SESSION_QUERY } from '../queries/customer';
import { GetCustomerSessionQuery } from '../types/graphql';
import { createErrorLink } from '../utils';

const WOO_SESSION_KEY = 'woo-session';

const httpLink = new HttpLink({
  uri: PUBLIC_GATEWAY_URL,
});

const client = new ApolloClient({
  cache: new NextSSRInMemoryCache(),
  link: from([httpLink]),
});

const sessionCreatorLink = () => {
  return setContext(async ({ context: { headers: currentHeaders } = {} }) => {
    const headers = { ...currentHeaders };

    let sessionToken = Cookies.get(WOO_SESSION_KEY);
    if (!sessionToken) {
      const { data } = await client.query<GetCustomerSessionQuery>({
        query: GET_CUSTOMER_SESSION_QUERY,
      });

      sessionToken = data.customer?.sessionToken!;
      Cookies.set(WOO_SESSION_KEY, sessionToken, { expires: 7 });
    }

    if (sessionToken) {
      headers['woocommerce-session'] = `Session ${sessionToken}`;
    }

    if (sessionToken) {
      return { headers };
    }

    return {};
  });
};

const sessionUpdaterLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    const session = headers.get('woocommerce-session');

    if (session && !session.includes('Session')) {
      Cookies.set(WOO_SESSION_KEY, session, { expires: 7 });
    }

    return response;
  }),
);

export const makeClient = () => {
  return new NextSSRApolloClient({
    ssrMode: true,
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),
    link: from([
      sessionCreatorLink(),
      sessionUpdaterLink,
      createErrorLink(),
      new SSRMultipartLink({ stripDefer: true }),
      httpLink,
    ]),
  });
};
