'use client';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import Logo from '@/components/common/Logo';
import { Link, useRouter } from '@/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Link as MuiLink } from '@mui/material';

type FieldNames = Partial<Record<'username' | 'password', any>>;

const Page = () => {
  const t = useTranslations();

  const labels: Record<keyof FieldNames, string> = {
    username: t('pages.login.username'),
    password: t('pages.login.password'),
  };
  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    username: yup.string().nullable().required().label(labels.username),
    password: yup.string().nullable().required().label(labels.password),
  });

  const methods = useForm<FieldNames>({
    resolver: yupResolver(resolveSchema),
  });

  const { control, handleSubmit } = methods;

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FieldNames> = (data) => {
    startTransition(async () => {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (result) {
        if (result.status !== 200) {
          toast.error('An Error Occurred!');
        } else {
          router.push('/');
        }
      }
    });
  };

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
          <Stack spacing={2}>
            <Controller
              control={control}
              name="username"
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
                    placeholder={labels[name]}
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    type="password"
                    onChange={onChange}
                    name={name}
                    value={value}
                    variant="outlined"
                    fullWidth
                    dir="ltr"
                    placeholder={labels[name]}
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                  />
                );
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack spacing={2} width="100%">
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
          <Typography variant="subtitle2">
            {t('messages.auth.doNotHaveAnAccount')}{' '}
            <MuiLink component={Link} href="/account/signup">
              {t('buttons.register')}
            </MuiLink>
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Page;
