'use client';

import { GET_CUSTOMER_ORDERS } from '@/graphql/queries/customer';
import { GetCustomerOrdersQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import { Card, CardContent, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import CardHeader from '../components/CardHeader';
import OrderItem from '../components/OrderItem';
import OrderItemSkeleton from '../components/OrderItemSkeleton';

const Page = () => {
  const t = useTranslations();

  const { data, loading, error } = useQuery<GetCustomerOrdersQuery>(
    GET_CUSTOMER_ORDERS,
    {
      variables: {
        count: 10,
        statuses: [],
      },
    },
  );

  return (
    <Card
      variant="outlined"
      sx={{
        flexGrow: 1,
      }}
    >
      <CardContent>
        <CardHeader title={t('order.ordersHistory')} />
        <Stack spacing={1.5} mt={2}>
          {loading || !!error ? (
            <OrderItemSkeleton />
          ) : (
            <>
              {data?.customer?.orders?.edges?.map((edge) => {
                const order = edge.node!;
                return <OrderItem key={order.id} {...order} />;
              })}
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Page;
