import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { GET_CUSTOMER_SESSION_QUERY } from './queries/customer';
import { GetCustomerSessionQuery } from './types/graphql';

const WOO_SESSION_KEY = 'woo-session';

export const defaultHttpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([defaultHttpLink]),
});

export const sessionCreatorLink = () => {
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

export const sessionUpdaterLink = new ApolloLink((operation, forward) =>
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

export const createErrorLink = () => {
  return onError(({ graphQLErrors, operation, forward }) => {
    const targetErrors = [
      'The iss do not match with this server',
      'invalid-secret-key | Expired token',
      'invalid-secret-key | Signature verification failed',
      'Expired token',
      'Wrong number of segments',
    ];
    let observable;

    if (graphQLErrors?.length) {
      graphQLErrors.map(({ originalError, message }) => {
        if (
          targetErrors.includes(message) ||
          targetErrors.includes(originalError?.message ?? '')
        ) {
          signOut();
          observable = new Observable((observer) => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            };
            forward(operation).subscribe(subscriber);
          });
        } else {
          if (typeof window !== 'undefined') {
            toast.error(message);
          }
        }
      });
    }

    return observable;
  });
};
