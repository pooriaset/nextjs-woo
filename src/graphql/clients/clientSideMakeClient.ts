import { ApolloLink, Observable, from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import {
  createErrorLink,
  createSessionLink,
  httpLink,
  updateLink,
} from '../utils';
import { getSession } from 'next-auth/react';

export const createAuthLink = (): ApolloLink =>
  new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      (async () => {
        try {
          const session = await getSession();
          const token = session?.user?.accessToken;
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: token ? `Bearer ${token}` : '',
            },
          }));

          const observable = forward(operation);

          observable.subscribe({
            next: (result) => observer.next(result),
            error: (error) => observer.error(error),
            complete: () => observer.complete(),
          });
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  });

export const makeClient = () => {
  return new NextSSRApolloClient({
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),
    link: from([
      createSessionLink(),
      createErrorLink(),
      createAuthLink(),
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
