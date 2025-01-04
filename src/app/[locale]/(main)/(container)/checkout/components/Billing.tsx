'use client';

import { authClient } from '@/graphql/clients/authClient';
import { GET_CUSTOMER_BILLING } from '@/graphql/queries/customer';
import { GetCustomerBillingQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import { LocationOnOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import CardHeader from './CardHeader';
import { BILLING_STATE_NAME_METADATA_KEY } from '@/config/inAppMetadata';

const Billing = () => {
  const t = useTranslations();

  const customer = useQuery<GetCustomerBillingQuery>(GET_CUSTOMER_BILLING, {
    client: authClient,
    variables: {
      keysIn: [BILLING_STATE_NAME_METADATA_KEY],
    },
  });
  const { state, city, address1 } = customer.data?.customer?.billing || {};

  const BILLING_STATE_NAME = customer.data?.customer?.metaData?.find(
    (item) => item?.key === BILLING_STATE_NAME_METADATA_KEY,
  )?.value;

  const hasAddress = Boolean(state && city && address1 && BILLING_STATE_NAME);

  return (
    <Card variant="outlined">
      <CardHeader
        title={t('pages.checkout.shipmentTo')}
        icon={LocationOnOutlined}
      />

      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          {hasAddress && (
            <Stack spacing={0.5}>
              <Typography>
                {t('pages.checkout.shipmentToAddressMessage')}
              </Typography>
              <Typography>
                {BILLING_STATE_NAME}، {city}، {address1}
              </Typography>
            </Stack>
          )}

          <Button variant="outlined">{t('pages.checkout.editAddress')}</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Billing;
