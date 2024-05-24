import { ApolloLink, HttpLink, from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { getSessionToken } from '@/services/common';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import { toast } from 'react-toastify';

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

const createErrorLink = () => {
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
          observable = new Observable((observer) => {
            getSessionToken(true)
              .then((sessionToken) => {
                operation.setContext(({ headers = {} }) => {
                  const nextHeaders: Record<string, string> = headers;

                  if (sessionToken) {
                    nextHeaders[
                      'woocommerce-session'
                    ] = `Session ${sessionToken}`;
                  } else {
                    delete nextHeaders['woocommerce-session'];
                  }

                  return {
                    headers: nextHeaders,
                  };
                });
              })
              .then(() => {
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };
                forward(operation).subscribe(subscriber);
              })
              .catch((error) => {
                observer.error(error);
              });
          });
        } else {
          toast.error(message);
        }
      });
    }
    return observable;
  });
};

export const makeClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  });

  return new NextSSRApolloClient({
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),

    link: from([
      createSessionLink(),
      createErrorLink(),
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
