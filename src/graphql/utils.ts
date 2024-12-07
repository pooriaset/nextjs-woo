import { HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import { toast } from 'react-toastify';

export const httpLink = new HttpLink({
  uri:
    typeof window !== 'undefined'
      ? process.env.NEXT_PUBLIC_GATEWAY_URL
      : `${process.env.__NEXT_PRIVATE_ORIGIN}${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
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
