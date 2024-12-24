'use client';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { UPDATE_SHIPPING_METHOD } from '@/graphql/queries/cart';
import {
  ShippingRate,
  UpdateShippingMethodMutation,
} from '@/graphql/types/graphql';
import useCartQuery from '@/hooks/useCartQuery';
import { cartAtom } from '@/store/atoms';
import { useMutation } from '@apollo/client';
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
import AvailableShippingMethods from './components/AvailableShippingMethods';
import Billing from './components/Billing';

const Page = () => {
  const t = useTranslations();
  const form = useForm();

  const { loading, refetch } = useCartQuery();

  useEffect(() => {
    refetch();
  }, []);

  const [update, { loading: shippingMethodLoading }] =
    useMutation<UpdateShippingMethodMutation>(UPDATE_SHIPPING_METHOD);

  const content = useAtomValue(cartAtom);
  if (!content?.contents?.itemCount) return <></>;

  const rates = content?.availableShippingMethods?.flatMap((item) => {
    return item?.rates;
  }) as ShippingRate[];

  const notFreeRates = rates.filter((item) => !item.methodId.includes('free'));

  const isFree = rates.length !== notFreeRates.length;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onShippingMethodChange = async (newValue: string) => {
    await update({
      variables: {
        shippingMethods: [newValue],
      },
    });
    refetch();
  };

  const isLoading = loading || shippingMethodLoading;

  return (
    <Grid container spacing={2} position="relative">
      <Grid item lg={9} md={6} xs={12}>
        <Card variant="outlined">
          <CardContent>
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
                name="description"
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
            </Stack>
          </CardContent>
        </Card>
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
              {isLoading ? (
                <CheckoutBoxSkeleton />
              ) : (
                <CheckoutBox content={content} />
              )}
            </CardContent>
            <CardActions>
              <ButtonWithLoading
                isLoading={isLoading}
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
