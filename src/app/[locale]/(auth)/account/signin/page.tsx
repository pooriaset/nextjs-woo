'use client';

import PasswordTextField from '@/components/PasswordTextField/PasswordTextField';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import Logo from '@/components/common/Logo';
import { Link, useRouter } from '@/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

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

  const getCallbackUrl = () => {
    const callbackUrl =
      new URL(location.href).searchParams.get('callbackUrl') || '/';
    const url = new URL(callbackUrl, window.location.origin);
    return url.pathname + url.search + url.hash;
  };

  const onSubmit: SubmitHandler<FieldNames> = (data) => {
    startTransition(async () => {
      const callbackUrl = getCallbackUrl();

      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (result) {
        if (result.status !== 200) {
          toast.error(t('messages.authenticationError'));
        } else {
          router.push(callbackUrl);
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
              {t('pages.login.buttons.login')}
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
                    label={labels[name]}
                    error={!!error?.message}
                    helperText={error?.message?.toString()}
                    inputProps={{
                      dir: 'ltr',
                    }}
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
