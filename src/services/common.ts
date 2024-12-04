import { GET_CUSTOMER_SESSION_QUERY } from '@/graphql/queries/customer';
import { GraphQLClient } from 'graphql-request';

export const Sleep = (time = 3000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const graphQLClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_URL!,
);

async function fetchSessionToken() {
  let sessionToken;
  try {
    const data = await graphQLClient.request<{
      customer: { sessionToken: string };
    }>(GET_CUSTOMER_SESSION_QUERY);

    // If user doesn't have an account return accountNeeded flag.
    sessionToken = data?.customer?.sessionToken;

    if (!sessionToken) {
      throw new Error('Failed to retrieve a new session token');
    }
  } catch (err) {
    console.error(err);
  }

  return sessionToken;
}

export async function getSessionToken(forceFetch = false) {
  let sessionToken: string | null | undefined = localStorage.getItem(
    process.env.NEXT_PUBLIC_WOOCOMMERCE_SESSION_KEY!,
  );
  if (!sessionToken || forceFetch) {
    sessionToken = await fetchSessionToken();
  }
  return sessionToken;
}
