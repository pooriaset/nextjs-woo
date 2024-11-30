import { ApolloLink, Observable, from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import Cookies from 'js-cookie';
import { getSession } from 'next-auth/react';
import { createErrorLink, httpLink, updateLink } from '../utils';

const createWooTokenLink = (): ApolloLink =>
  new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      (async () => {
        try {
          const key = process.env.NEXT_PUBLIC_WOOCOMMERCE_SESSION_KEY!;
          const wooToken = Cookies.get(key);
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              [key]: `Session ${wooToken}`,
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

export const createAuthLink = (): ApolloLink =>
  new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      (async () => {
        try {
          const session = await getSession();
          const token = session?.user?.accessToken;
          const key = process.env.NEXT_PUBLIC_WOOCOMMERCE_SESSION_KEY!;
          const wooToken = Cookies.get(key);

          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: token ? `Bearer ${token}` : '',
              [key]: wooToken ? `Session ${wooToken}` : '',
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
      createErrorLink(),
      createAuthLink(),
      createWooTokenLink(),
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
