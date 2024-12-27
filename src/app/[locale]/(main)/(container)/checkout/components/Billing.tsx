import { authClient } from '@/graphql/clients/authClient';
import { GET_CUSTOMER_BILLING } from '@/graphql/queries/customer';
import { GetCustomerBillingQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import React from 'react';

const Billing = () => {
  const { data } = useQuery<GetCustomerBillingQuery>(GET_CUSTOMER_BILLING, {
    client: authClient,
  });
  const billing = data?.customer?.billing;

  return <div></div>;
};

export default Billing;
