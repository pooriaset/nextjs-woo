'use client';

import { GET_CUSTOMER_ORDERS } from '@/graphql/queries/customer';
import { GetCustomerOrdersQuery } from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import { useQuery } from '@apollo/client';
import { Warning } from '@mui/icons-material';
import { Alert, Card, CardContent, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import CardHeader from '../components/CardHeader';
import OrderItem from '../components/OrderItem';
import OrderItemSkeleton from '../components/OrderItemSkeleton';
import { authClient } from '@/graphql/clients/authClient';

const Page = () => {
  const t = useTranslations();

  const { data, loading, error } = useQuery<GetCustomerOrdersQuery>(
    GET_CUSTOMER_ORDERS,
    {
      client: authClient,
      variables: {
        count: 1000,
        statuses: [],
      },
    },
  );

  const { isMobile } = useAppContext();

  const items = (
    <Stack spacing={1.5}>
      {loading || !!error ? (
        <OrderItemSkeleton />
      ) : (
        <>
          {data?.customer?.orders?.edges?.length === 0 && (
            <Alert color="warning" icon={<Warning />}>
              {t('order.noRowsToShow')}
            </Alert>
          )}

          {data?.customer?.orders?.edges?.map((edge) => {
            const order = edge.node!;
            return <OrderItem key={order.id} {...order} />;
          })}
        </>
      )}
    </Stack>
  );

  if (isMobile) {
    return items;
  }

  const title = t('order.ordersHistory');
  return (
    <Card
      variant="outlined"
      sx={{
        flexGrow: 1,
      }}
    >
      <CardContent>
        <CardHeader title={title} />
        {items}
      </CardContent>
    </Card>
  );
};

export default Page;
