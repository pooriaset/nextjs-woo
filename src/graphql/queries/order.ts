import { gql } from '@apollo/client';
import { ProductVariationContentSlice } from './cart';

export const GET_ORDER = gql`
  query GetOrder($id: ID) {
    order(idType: DATABASE_ID, id: $id) {
      id: databaseId
      shipping {
        address1
        address2
        city
        firstName
        lastName
        phone
        postcode
        state
      }
      total(format: RAW)
      subtotal(format: RAW)
      discountTotal(format: RAW)
      shippingTotal
      feeLines {
        edges {
          node {
            id
            total
          }
        }
      }
      date
      dateCompleted
      status
      datePaid
      lineItems {
        nodes {
          id: variationId
          total
          subtotal
          variation {
            node {
              ...ProductVariationContentSlice
            }
          }
        }
      }
    }
  }
  ${ProductVariationContentSlice}
`;
