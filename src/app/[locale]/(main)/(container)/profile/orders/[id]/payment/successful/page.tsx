'use client';

import { authClient } from '@/graphql/clients/authClient';
import { GET_IS_PAYED_ORDER } from '@/graphql/queries/order';
import { GetIsPayedOrderQuery } from '@/graphql/types/graphql';
import { redirect } from '@/navigation';
import { useQuery } from '@apollo/client';
import { Card, CardContent } from '@mui/material';
import { FC } from 'react';
import OrderDetails from './components/OrderDetails';
import Loading from './loading';

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = (props) => {
  const orderId = +props.params.id;

  const { data, error, loading } = useQuery<GetIsPayedOrderQuery>(
    GET_IS_PAYED_ORDER,
    {
      client: authClient,
      variables: {
        id: orderId,
      },
    },
  );

  if (loading) {
    return <Loading />;
  }

  if (error || !data?.order?.datePaid) {
    return redirect(`/profile/orders/${orderId}`);
  }

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <OrderDetails
          transactionId={data.order.transactionId}
          orderId={orderId}
        />
      </CardContent>
    </Card>
  );
};

export default Page;
