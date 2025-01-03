'use client';

import PasswordTextField from '@/components/PasswordTextField/PasswordTextField';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import Logo from '@/components/common/Logo';
import { REGISTER_CUSTOMER } from '@/graphql/queries/auth';
import { RegisterCustomerMutation } from '@/graphql/types/graphql';
import { Link, useRouter } from '@/navigation';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

type FieldNames = Partial<
  Record<
    'email' | 'password' | 'confirmPassword' | 'firstName' | 'lastName',
    any
  >
>;

const Page = () => {
  const t = useTranslations();

  const labels: Record<keyof FieldNames, string> = {
    email: t('pages.login.email'),
    password: t('pages.login.password'),
    confirmPassword: t('pages.login.confirmPassword'),
    firstName: t('pages.login.firstName'),
    lastName: t('pages.login.lastName'),
  };
  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    email: yup.string().email().nullable().required().label(labels.email),
    password: yup.string().min(6).nullable().required().label(labels.password),
    confirmPassword: yup
      .string()
      .nullable()
      .required()
      .oneOf([yup.ref('password')], t('messages.passwordNotMatch'))
      .label(labels.confirmPassword),
    firstName: yup.string().nullable().required().label(labels.firstName),
    lastName: yup.string().nullable().required().label(labels.lastName),
  });

  const methods = useForm<FieldNames>({
    resolver: yupResolver(resolveSchema),
  });

  const { control, handleSubmit } = methods;

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [registerCustomer] =
    useMutation<RegisterCustomerMutation>(REGISTER_CUSTOMER);
  const onSubmit: SubmitHandler<FieldNames> = (data) => {
    startTransition(async () => {
      try {
        const { errors } = await registerCustomer({
          variables: {
            ...data,
          },
        });
        if (!errors?.length) {
          const result = await signIn('credentials', {
            username: data.email,
            password: data.password,
            redirect: false,
          });

          if (result) {
            if (result.status !== 200) {
              toast.error('An Error Occurred!');
            } else {
              router.push('/');
            }
          }
        }
      } catch (error) {}
    });
  };

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)} variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                {t('pages.login.buttons.register')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="firstName"
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
                    label={labels[name]}
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                    InputProps={{
                      autoComplete: 'new-password',
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="lastName"
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
                    label={labels[name]}
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                    inputProps={{
                      autoComplete: 'new-password',
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="email"
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
                    label={labels[name]}
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                    inputProps={{
                      autoComplete: 'new-password',
                      dir: 'ltr',
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="password"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <PasswordTextField
                    onChange={onChange}
                    name={name}
                    value={value}
                    variant="outlined"
                    fullWidth
                    label={labels[name]}
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="confirmPassword"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <PasswordTextField
                    onChange={onChange}
                    name={name}
                    value={value}
                    variant="outlined"
                    fullWidth
                    label={labels[name]}
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                );
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <ButtonWithLoading
              isLoading={isPending}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              {t('pages.login.buttons.login')}
            </ButtonWithLoading>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Page;
