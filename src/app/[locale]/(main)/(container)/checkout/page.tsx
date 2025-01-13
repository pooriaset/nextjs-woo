'use client';

import UserFields from '@/components/UserFields/UserFields';
import useUserFields from '@/components/UserFields/hooks/useUserFields';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { authClient } from '@/graphql/clients/authClient';
import {
  EMPTY_CART_MUTATION,
  UPDATE_SHIPPING_METHOD,
} from '@/graphql/queries/cart';
import {
  CHECKOUT_MUTATION,
  GET_PAYMENT_GATEWAYS,
} from '@/graphql/queries/checkout';
import { GET_CUSTOMER_BILLING } from '@/graphql/queries/customer';
import {
  CheckoutMutation,
  GetCustomerBillingQuery,
  GetCustomerBillingQueryVariables,
  GetPaymentGatewaysQuery,
  RemoveItemsFromCartMutation,
  ShippingRate,
  UpdateShippingMethodMutation,
} from '@/graphql/types/graphql';
import useCartQuery from '@/hooks/useCartQuery';
import { redirect } from '@/navigation';
import { cartAtom } from '@/store/atoms';
import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocationOnOutlined } from '@mui/icons-material';
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
import { Controller, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CheckoutBox from '../cart/components/CheckoutBox';
import CheckoutBoxSkeleton from '../cart/components/CheckoutBoxSkeleton';
import DiscountCode from '../cart/components/DiscountCode';
import AvailablePaymentGateways from './components/AvailablePaymentGateways';
import AvailableShippingMethods from './components/AvailableShippingMethods';
import CardHeader from './components/CardHeader';
import Loading from './loading';

const Page = () => {
  const t = useTranslations();

  const { schema } = useUserFields();

  const checkoutSchema = yup.object({
    paymentMethod: yup.string().nullable().required(),
    customerNote: yup.string().max(500).nullable(),
  });

  const form = useForm({
    resolver: yupResolver(schema.concat(checkoutSchema)),
  });

  const content = useAtomValue(cartAtom);

  const gatewaysQuery = useQuery<GetPaymentGatewaysQuery>(GET_PAYMENT_GATEWAYS);
  const customer = useQuery<
    GetCustomerBillingQuery,
    GetCustomerBillingQueryVariables
  >(GET_CUSTOMER_BILLING, {
    client: authClient,
  });

  useEffect(() => {
    if (
      !customer.loading &&
      !!customer.data &&
      !gatewaysQuery.loading &&
      !!gatewaysQuery.data
    ) {
      const billing = customer.data.customer?.billing!;
      delete billing.__typename;
      form.reset({
        ...billing,
        paymentMethod: gatewaysQuery.data?.paymentGateways?.nodes?.[0].id!,
      });
    }
  }, [gatewaysQuery.loading, customer.loading]);

  const { loading, refetch } = useCartQuery();

  useEffect(() => {
    refetch();
  }, []);

  const [updateShippingMethod, { loading: shippingMethodLoading }] =
    useMutation<UpdateShippingMethodMutation>(UPDATE_SHIPPING_METHOD, {
      client: authClient,
    });

  const [checkout, { loading: checkoutLoading }] =
    useMutation<CheckoutMutation>(CHECKOUT_MUTATION, {
      client: authClient,
    });

  const [emptyCartMutate, { loading: emptyCartLoading }] =
    useMutation<RemoveItemsFromCartMutation>(EMPTY_CART_MUTATION, {
      client: authClient,
    });

  if (!content?.contents?.itemCount) {
    if (loading || content === null) {
      return <Loading />;
    }

    return redirect('/cart');
  }

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

  const onSubmit = async (payload: any) => {
    const { customerNote, paymentMethod, ...billing } = payload;
    const { data } = await checkout({
      variables: {
        customerNote: customerNote,
        paymentMethod: paymentMethod,
        billing: billing,
        shipping: billing,
      },
    });

    const url = data?.checkout?.redirect;

    if (url) {
      window.location.replace(url);
      await emptyCartMutate();
    }
  };

  const isCartLoading = loading || shippingMethodLoading;
  const isButtonLoading =
    isCartLoading || customer.loading || checkoutLoading || emptyCartLoading;

  return (
    <FormProvider {...form}>
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

            <Card variant="outlined">
              <CardHeader
                title={t('pages.checkout.shipmentTo')}
                icon={LocationOnOutlined}
              />

              <CardContent>
                <Grid container spacing={2}>
                  <UserFields
                    loading={customer.loading}
                    disabled={
                      checkoutLoading || customer.loading || emptyCartLoading
                    }
                  />
                </Grid>
              </CardContent>
            </Card>

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
    </FormProvider>
  );
};

export default Page;
