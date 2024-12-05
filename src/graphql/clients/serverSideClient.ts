import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
  from,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { createAuthLink } from './clientSideMakeClient';
import { cookies } from 'next/headers';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

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
