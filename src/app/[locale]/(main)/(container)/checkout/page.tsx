'use client';

import { getFragmentData } from '@/graphql/types';
import { CartContentFragmentDoc, ShippingRate } from '@/graphql/types/graphql';
import useCartQuery from '@/hooks/useCartQuery';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import AppliedCoupons from '../cart/components/AppliedCoupons';
import CheckoutBox from '../cart/components/CheckoutBox';
import DiscountCode from '../cart/components/DiscountCode';
import AvailableShippingMethods from './components/AvailableShippingMethods';
import Billing from './components/Billing';

const Page = () => {
  const t = useTranslations();
  const form = useForm();

  const { loading, data } = useCartQuery();

  const content = getFragmentData(CartContentFragmentDoc, data?.cart);

  if (!content?.contents?.itemCount) return <></>;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const rates = content?.availableShippingMethods
    ?.flatMap((item) => {
      return item?.rates;
    })
    .filter((item) => item?.cost) as ShippingRate[];

  return (
    <Grid container spacing={2} position="relative">
      <Grid item lg={9} md={6} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={3}>
              <DiscountCode />
              <AvailableShippingMethods
                rates={rates}
                value={content.chosenShippingMethods?.[0]}
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
        <Card variant="outlined">
          <CardContent>
            <CheckoutBox content={content} />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              {t('pages.checkout.buttons.placeOrder')}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Page;
