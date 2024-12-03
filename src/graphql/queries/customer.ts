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

export const GET_CUSTOMER_PROFILE = gql`
  query GetCustomerProfile {
    customer {
      id
      firstName
      lastName
      username
      orderCount
    }
  }
`;
