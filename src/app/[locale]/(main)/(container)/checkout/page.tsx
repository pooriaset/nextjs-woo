'use client';

import {
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Billing from './components/Billing';

const Page = () => {
  const t = useTranslations();

  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card
      variant="outlined"
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <CardContent>
        <Stack spacing={3}>
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
