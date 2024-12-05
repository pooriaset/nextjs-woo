'use client';

import PriceLabel from '@/components/common/PriceLabel';
import { GET_ORDER } from '@/graphql/queries/order';
import { getFragmentData } from '@/graphql/types';
import {
  GetOrderQuery,
  ProductVariationContentSliceFragmentDoc,
} from '@/graphql/types/graphql';
import useLocaleDate from '@/hooks/useLocaleDate';
import useOrderStatusMapper from '@/hooks/useOrderStatusMapper';
import { useQuery } from '@apollo/client';
import { Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import { FC, Fragment } from 'react';
import CardHeader from '../../components/CardHeader';
import OrderVariantItem from './components/OrderVariantItem';

type PageProps = {
  params: { id: string };
};

const Page: FC<PageProps> = (props) => {
  const {
    params: { id },
  } = props;

  const { data, loading, error } = useQuery<GetOrderQuery>(GET_ORDER, {
    variables: {
      id: +id,
    },
    fetchPolicy: 'no-cache',
  });

  const t = useTranslations();
  const statusMapper = useOrderStatusMapper();

  const order = data?.order;

  const localeDate = useLocaleDate(order?.date);

  if (loading || !!error || !order) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <CircularProgress size={28} />
      </Stack>
    );
  }

  const shipping = order?.shipping!;

  const mapper = statusMapper[order.status!];

  const detailItems = [
    {
      title: t('order.info.orderId'),
      value: order.id,
      type: 'typography',
    },
    {
      title: t('order.info.status'),
      value: (
        <Chip
          label={mapper.label}
          sx={{
            color: mapper.color,
            backgroundColor: mapper.bgColor,
          }}
        />
      ),
      type: 'custom',
    },
    {
      title: t('order.info.orderDate'),
      value: localeDate,
      type: 'typography',
    },
    {
      title: t('order.info.recipient'),
      value: shipping.firstName + ' ' + shipping.lastName,
      type: 'typography',
    },
    {
      title: t('order.info.address'),
      value: `${shipping.city} - ${shipping.address1}`,
      type: 'typography',
    },
    {
      title: t('order.info.phone'),
      value: shipping.phone,
      type: 'typography',
    },
  ];

  const checkoutItems = [
    {
      title: t('order.invoice.paidAmount'),
      value: +order.total!,
      color: 'text.primary',
    },
  ];

  const profit = +order.subtotal! - +order.total!;

  if (profit > 0) {
    checkoutItems.push({
      title: t('order.invoice.yourProfit'),
      value: profit,
      color: 'error',
    });
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <CardHeader title={t('order.detailsTitle')} back />
        <Stack spacing={2} mt={2}>
          <Grid container alignItems="center">
            {detailItems.map((item) => {
              return (
                <Fragment key={item.title}>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" color="text.secondary">
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sx={{
                      py: 1,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {item.type === 'typography' ? (
                      <Typography variant="body1" fontWeight={500}>
                        {item.value}
                      </Typography>
                    ) : (
                      item.value
                    )}
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>

          <CardHeader title={t('order.invoiceTitle')} />
          <Grid container alignItems="center">
            {checkoutItems.map((item) => {
              return (
                <Fragment key={item.title}>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" color={item.color}>
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    key={item.title}
                    sx={{
                      py: 1,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <PriceLabel
                      value={item.value}
                      TypographyProps={{
                        color: item.color,
                        fontWeight: 600,
                      }}
                    />
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>

          <CardHeader title={t('order.itemsTitle')} />

          <Stack spacing={1}>
            {order.lineItems?.nodes.map((node) => {
              const variant = getFragmentData(
                ProductVariationContentSliceFragmentDoc,
                node.variation?.node,
              )!;

              return (
                <OrderVariantItem
                  key={node.id}
                  variant={variant}
                  productId={node.productId!}
                  total={node.total!}
                  quantity={node.quantity!}
                />
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Page;
