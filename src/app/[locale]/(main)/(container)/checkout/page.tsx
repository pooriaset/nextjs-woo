'use client';

import { getFragmentData } from '@/graphql/types';
import { CartContentFragmentDoc, ShippingRate } from '@/graphql/types/graphql';
import useCartQuery from '@/hooks/useCartQuery';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import AvailableShippingMethods from './components/AvailableShippingMethods';
import Billing from './components/Billing';

const Page = () => {
  const t = useTranslations();
  const form = useForm();

  const { loading, data } = useCartQuery();

  const content = getFragmentData(CartContentFragmentDoc, data?.cart);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const rates = content?.availableShippingMethods
    ?.flatMap((item) => {
      return item?.rates;
    })
    .filter((item) => item?.cost) as ShippingRate[];

  return (
    <Card
      variant="outlined"
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <CardContent>
        <Stack spacing={3}>
          {rates?.length > 0 && <AvailableShippingMethods rates={rates} />}
          {!rates?.length && 'Free'}
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
  );
};

export default Page;
