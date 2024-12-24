import { gql } from '@apollo/client';

export const GET_CUSTOMER_BILLING = gql`
  query GetCustomerBilling {
    customer {
      id: databaseId
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

export const CUSTOMER_ORDER_LINE_ITEM_FRAGMENT = gql`
  fragment CustomerOrdersLineItems on LineItem {
    id
    product {
      node {
        id
        image {
          id
          sourceUrl
        }
      }
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders($count: Int!, $statuses: [OrderStatusEnum]) {
    customer {
      orders(last: $count, where: { statuses: $statuses }) {
        edges {
          node {
            id: databaseId
            total(format: RAW)
            subtotal(format: RAW)
            status
            date
            lineItems {
              nodes {
                ...CustomerOrdersLineItems
              }
            }
          }
        }
      }
    }
  }
  ${CUSTOMER_ORDER_LINE_ITEM_FRAGMENT}
`;
