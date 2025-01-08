import { Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const Newsletter = () => {
  const t = useTranslations();
  const form = useForm();

  return (
    <Stack component="form" spacing={1}>
      <Typography variant="h6">{t('footer.newsletter.title')}</Typography>
      <Stack spacing={1} alignItems="center" direction="row">
        <Controller
          name="email"
          control={form.control}
          render={(props) => {
            const {
              field: { name, value },
              fieldState: { error },
            } = props;
            return (
              <TextField
                name={name}
                value={value}
                placeholder={t('pages.login.email')}
                variant="outlined"
                size="small"
                fullWidth
                error={!!error?.message}
                helperText={error?.message?.toString()}
              />
            );
          }}
        />
        <Button color="primary" variant="contained">
          {t('buttons.submit')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Newsletter;
