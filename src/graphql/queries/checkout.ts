import { gql } from '@apollo/client';

export const GET_PAYMENT_GATEWAYS = gql`
  query GetPaymentGateways {
    paymentGateways {
      nodes {
        id
        title
        description
        icon
      }
    }
  }
`;
export const CHECKOUT_MUTATION = gql`
  mutation Checkout($customerNote: String, $paymentMethod: String) {
    checkout(
      input: { customerNote: $customerNote, paymentMethod: $paymentMethod }
    ) {
      redirect
      clientMutationId
    }
  }
`;
