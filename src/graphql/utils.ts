import { getSessionToken } from '@/services/common';
import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import { toast } from 'react-toastify';

export const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

export const createSessionLink = () => {
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

export const updateLink = new ApolloLink((operation, forward) => {
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
          observable = new Observable((observer) => {
            const subscriber = {
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            };
            forward(operation).subscribe(subscriber);
          });
        } else {
          toast.error(message, {
            toastId: message,
          });
        }
      });
    }
    return observable;
  });
};
