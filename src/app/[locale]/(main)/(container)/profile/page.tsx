'use client';

import { DesktopView, MobileView } from '@/components/ResponsiveDesign';
import { GET_CUSTOMER_ORDERS } from '@/graphql/queries/customer';
import { GetCustomerOrdersQuery } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { useQuery } from '@apollo/client';
import { Alert, Button, Card, CardContent, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import CardHeader from './components/CardHeader';
import Menu from './components/Menu';
import OrderItem from './components/OrderItem';
import OrderItemSkeleton from './components/OrderItemSkeleton';
import { Warning } from '@mui/icons-material';
import { authClient } from '@/graphql/clients/authClient';

const Page = () => {
  const t = useTranslations();

  const { data, loading, error } = useQuery<GetCustomerOrdersQuery>(
    GET_CUSTOMER_ORDERS,
    {
      variables: {
        count: 3,
        statuses: [],
      },
      client: authClient,
    },
  );

  const edges = data?.customer?.orders?.edges;

  return (
    <Stack spacing={2} flexGrow={1}>
      <MobileView>
        <Menu />
      </MobileView>
      <DesktopView>
        <Card
          variant="outlined"
          sx={{
            flexGrow: 1,
          }}
        >
          <CardContent>
            <CardHeader title={t('profile.latestOrders')}>
              {!!edges?.length && (
                <Button
                  variant="text"
                  color="info"
                  component={Link}
                  href="/profile/orders"
                >
                  {t('buttons.viewMore')}
                </Button>
              )}
            </CardHeader>

            <Stack spacing={1.5} mt={2}>
              {loading || !!error ? (
                <OrderItemSkeleton />
              ) : (
                <>
                  {edges?.map((edge) => {
                    const order = edge.node!;
                    return <OrderItem key={order.id} {...order} />;
                  })}

                  {edges?.length === 0 && (
                    <Alert color="warning" icon={<Warning />}>
                      {t('order.noRowsToShow')}
                    </Alert>
                  )}
                </>
              )}
            </Stack>
          </CardContent>
        </Card>
      </DesktopView>
    </Stack>
  );
};

export default Page;
