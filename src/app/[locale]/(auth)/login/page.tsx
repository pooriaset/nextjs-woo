'use client';

import Logo from '@/components/common/Logo';
import { Link } from '@/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type FieldNames = Partial<Record<'mobileNumber', any>>;

const Page = () => {
  const t = useTranslations();

  const labels: Record<keyof FieldNames, string> = {
    mobileNumber: t('pages.login.phoneNumber'),
  };
  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    mobileNumber: yup.string().nullable().required().label(labels.mobileNumber),
  });

  const methods = useForm<FieldNames>({
    resolver: yupResolver(resolveSchema),
  });

  const { control, handleSubmit } = methods;

  const onSubmit: SubmitHandler<FieldNames> = (data) => console.log(data);

  return (
    <Card
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      variant="outlined"
      sx={{
        p: 2,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Stack spacing={3} justifyContent="center" alignItems="center">
            <Box
              sx={{
                pt: 2,
              }}
            >
              <Link href="/">
                <Logo />
              </Link>
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              {t('pages.login.title')}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body2">{t('pages.login.hello')}</Typography>
            <Typography variant="body2">{t('pages.login.message')}</Typography>
          </Stack>

          <Controller
            control={control}
            name="mobileNumber"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => {
              return (
                <TextField
                  onChange={onChange}
                  name={name}
                  value={value}
                  variant="outlined"
                  fullWidth
                  dir="ltr"
                  placeholder={t('pages.login.phoneNumber')}
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
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          {t('pages.login.buttons.getTheCode')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Page;
