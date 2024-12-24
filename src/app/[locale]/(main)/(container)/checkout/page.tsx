'use client';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { UPDATE_SHIPPING_METHOD } from '@/graphql/queries/cart';
import {
  CHECKOUT_MUTATION,
  GET_PAYMENT_GATEWAYS,
} from '@/graphql/queries/checkout';
import {
  GetPaymentGatewaysQuery,
  ShippingRate,
  UpdateShippingMethodMutation,
} from '@/graphql/types/graphql';
import useCartQuery from '@/hooks/useCartQuery';
import useEmptyCart from '@/hooks/useEmptyCart';
import { redirect } from '@/navigation';
import { cartAtom } from '@/store/atoms';
import { useMutation, useQuery } from '@apollo/client';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CheckoutBox from '../cart/components/CheckoutBox';
import CheckoutBoxSkeleton from '../cart/components/CheckoutBoxSkeleton';
import DiscountCode from '../cart/components/DiscountCode';
import AvailablePaymentGateways from './components/AvailablePaymentGateways';
import AvailableShippingMethods from './components/AvailableShippingMethods';
import Billing from './components/Billing';

const Page = () => {
  const t = useTranslations();
  const form = useForm();
  const content = useAtomValue(cartAtom);

  const gatewaysQuery = useQuery<GetPaymentGatewaysQuery>(
    GET_PAYMENT_GATEWAYS,
    {
      onCompleted: (data) => {
        form.reset({
          paymentMethod: data?.paymentGateways?.nodes?.[0].id,
        });
      },
    },
  );

  const { loading, refetch } = useCartQuery();

  useEffect(() => {
    refetch();
  }, []);

  const [updateShippingMethod, { loading: shippingMethodLoading }] =
    useMutation<UpdateShippingMethodMutation>(UPDATE_SHIPPING_METHOD);

  const [checkout, { loading: checkoutLoading }] =
    useMutation(CHECKOUT_MUTATION);

  const { emptyCartLoading, emptyCartMutate } = useEmptyCart();

  if (!content?.contents?.itemCount) return redirect('/cart');
  const rates = content?.availableShippingMethods?.flatMap((item) => {
    return item?.rates;
  }) as ShippingRate[];

  const notFreeRates = rates.filter((item) => !item.methodId.includes('free'));

  const isFree = rates.length !== notFreeRates.length;

  const onShippingMethodChange = async (newValue: string) => {
    await updateShippingMethod({
      variables: {
        shippingMethods: [newValue],
      },
    });
    refetch();
  };

  const onSubmit = async (data: any) => {
    await checkout({
      variables: {
        customerNote: data.customerNote,
        paymentMethod: data.paymentMethod,
      },
    });

    await emptyCartMutate();
  };

  const isCartLoading = loading || shippingMethodLoading;
  const isButtonLoading = isCartLoading || checkoutLoading || emptyCartLoading;

  return (
    <Grid
      container
      spacing={2}
      position="relative"
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Grid item lg={9} md={6} xs={12}>
        <Stack spacing={3}>
          <AvailableShippingMethods
            isFree={isFree}
            rates={notFreeRates}
            defaultValue={content.chosenShippingMethods?.[0]}
            onChange={onShippingMethodChange}
          />

          <Billing />
          <Controller
            control={form.control}
            name="customerNote"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  onChange={onChange}
                  name={name}
                  multiline
                  rows={4}
                  value={value}
                  variant="outlined"
                  fullWidth
                  placeholder={t('pages.checkout.fields.description')}
                  error={!!error?.message}
                  helperText={error?.message?.toString()}
                />
              );
            }}
          />

          <Controller
            name="paymentMethod"
            control={form.control}
            render={(props) => {
              const {
                field: { value, onChange },
              } = props;
              return (
                <AvailablePaymentGateways
                  value={value}
                  onChange={onChange}
                  items={gatewaysQuery.data}
                />
              );
            }}
          />
        </Stack>
      </Grid>

      <Grid item lg={3} md={6} xs={12}>
        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <DiscountCode />
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              {isCartLoading ? (
                <CheckoutBoxSkeleton />
              ) : (
                <CheckoutBox content={content} />
              )}
            </CardContent>
            <CardActions>
              <ButtonWithLoading
                isLoading={isButtonLoading}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                {t('pages.checkout.buttons.placeOrder')}
              </ButtonWithLoading>
            </CardActions>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Page;
