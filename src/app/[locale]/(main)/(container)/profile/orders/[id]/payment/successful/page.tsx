import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_IS_PAYED_ORDER } from '@/graphql/queries/order';
import { GetIsPayedOrderQuery } from '@/graphql/types/graphql';
import { redirect } from '@/navigation';
import { Card, CardContent } from '@mui/material';
import { FC } from 'react';
import OrderDetails from './components/OrderDetails';

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = async (props) => {
  const orderId = +props.params.id;

  try {
    const { data, error } = await getClient().query<GetIsPayedOrderQuery>({
      query: GET_IS_PAYED_ORDER,
      variables: {
        id: orderId,
      },
    });

    if (!data.order?.datePaid) {
      throw new Error('Order not payed!');
    }

    return (
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardContent>
          <OrderDetails
            transactionId={data.order.transactionId!}
            orderId={orderId}
          />
        </CardContent>
      </Card>
    );
  } catch (error) {
    return redirect(`/profile/orders/${orderId}`);
  }
};

export default Page;
