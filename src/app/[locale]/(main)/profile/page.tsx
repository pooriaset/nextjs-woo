'use client';

import { GET_CUSTOMER_ORDERS } from '@/graphql/queries/customer';
import { GetCustomerOrdersQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import OrderItem from './components/OrderItem';

const Page = () => {
  const t = useTranslations();

  const { data } = useQuery<GetCustomerOrdersQuery>(GET_CUSTOMER_ORDERS, {
    variables: {
      count: 3,
      statuses: [],
    },
  });

  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        <CardHeader
          titleTypographyProps={{
            variant: 'subtitle1',
          }}
          title={t('profile.latestOrders')}
        />
        <CardContent>
          {data?.customer?.orders?.edges?.map((edge) => {
            const order = edge.node!;
            return <OrderItem key={order.id} {...order} />;
          })}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Page;
