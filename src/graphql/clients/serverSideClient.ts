import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  from,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies } from 'next/headers';
import { httpLink } from '../utils';
import { createAuthLink } from './clientSideMakeClient';

const createWooTokenLink = (): ApolloLink =>
  new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      (async () => {
        try {
          const key = process.env.NEXT_PUBLIC_WOOCOMMERCE_SESSION_KEY!;
          const wooToken = cookies().get(key)?.value;

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

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: from([createAuthLink(), createWooTokenLink(), httpLink]),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
});
