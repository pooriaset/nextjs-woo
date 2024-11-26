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
