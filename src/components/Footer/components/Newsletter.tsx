import { Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

type FieldNames = {
  email: string;
};

const Newsletter = () => {
  const t = useTranslations();

  const labels: FieldNames = {
    email: t('pages.login.email'),
  };

  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    email: yup.string().email().nullable().required().label(labels.email),
  });

  const form = useForm({
    resolver: yupResolver(resolveSchema),
  });

  const onSubmit: SubmitHandler<FieldNames> = (payload) => {
    toast.success(t('messages.defaultSuccess'));
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <Stack
        component="form"
        spacing={1}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Typography variant="h6">{t('footer.newsletter.title')}</Typography>
        <Stack spacing={1} alignItems="center" direction="row">
          <Controller
            name="email"
            control={form.control}
            render={(props) => {
              const {
                field: { name, value, onChange },
                fieldState: { error },
              } = props;
              return (
                <TextField
                  name={name}
                  value={value || ''}
                  onChange={onChange}
                  placeholder={labels.email}
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!error?.message}
                  helperText={error?.message?.toString()}
                />
              );
            }}
          />
          <Button color="primary" variant="contained" type="submit">
            {t('buttons.submit')}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default Newsletter;
