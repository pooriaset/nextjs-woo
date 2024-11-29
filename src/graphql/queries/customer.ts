import { gql } from '@apollo/client';

export const GET_CUSTOMER_BILLING = gql`
  query GetCustomerBilling {
    customer {
      billing {
        firstName
        lastName
        address1
        state
        city
        phone
        postcode
      }
    }
  }
`;
export const GET_CUSTOMER_SESSION_QUERY = gql`
  query GetCustomerSession {
    customer {
      sessionToken
    }
  }
`;
