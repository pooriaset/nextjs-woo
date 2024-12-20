import { PUBLIC_GATEWAY_URL } from '@/config/app';
import { ApolloClient, HttpLink, from } from '@apollo/client';
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

const createSessionLink = () => {
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

export const makeClient = () => {
  return new NextSSRApolloClient({
    ssrMode: true,
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),
    link: from([
      createSessionLink(),
      createErrorLink(),
      new SSRMultipartLink({ stripDefer: true }),
      httpLink,
    ]),
  });
};
