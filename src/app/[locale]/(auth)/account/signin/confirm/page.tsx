'use client';

import { SIGN_IN_PAGE_PATHNAME } from '@/app/api/auth/[...nextauth]/route';
import Logo from '@/components/common/Logo';
import { useAppContext } from '@/hooks/useAppContext';
import { Link } from '@/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Edit, HourglassTopOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  Stack,
  Typography,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { digitsFaToEn } from '@persian-tools/persian-tools';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import Countdown from 'react-countdown';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import * as yup from 'yup';

type FieldNames = Partial<Record<'code', any>>;

const Page = () => {
  const { isMobile } = useAppContext();
  const t = useTranslations();

  const labels: Record<keyof FieldNames, string> = {
    code: t('pages.confirm.fields.code'),
  };

  const englishAndPersianNumbersRegex = /^[0-9\u06F0-\u06F9]+$/;

  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    code: yup
      .string()
      .nullable()
      .required()
      .matches(
        englishAndPersianNumbersRegex,
        t('pages.confirm.messages.onlyNumberIsValid'),
      )
      .min(6)
      .label(labels.code),
  });

  const methods = useForm<FieldNames>({
    resolver: yupResolver(resolveSchema),
  });

  const { control, handleSubmit, watch } = methods;

  const onSubmit: SubmitHandler<FieldNames> = (data) => console.log(data);

  const [code] = watch(['code']);

  useEffect(() => {
    if (code?.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [code, handleSubmit]);

  const handleClickOnSendAgain = () => {};

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
        <Stack spacing={2}>
          <Stack spacing={3} justifyContent="center" alignItems="center">
            <Box
              sx={{
                pt: 2,
              }}
            >
              <Logo />
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                mb: 1,
              }}
            >
              {t('pages.confirm.title')}
            </Typography>
          </Stack>
          <Stack
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">
              {t('pages.confirm.enterCodeMessage', {
                phoneNumber: '09358885566',
              })}
            </Typography>
          </Stack>

          <Controller
            control={control}
            name="code"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <>
                  <OtpInput
                    containerStyle={{
                      direction: 'ltr',
                      justifyContent: 'space-between',
                    }}
                    inputStyle={{
                      width: 40,
                      height: 40,
                      marginRight: 8,
                      borderRadius: 4,
                      boxShadow: 'none',
                      outlineWidth: 0,
                      border: '1px solid',
                      borderColor: error?.message ? red[500] : grey[300],
                      textAlign: 'center',
                      fontSize: 24,
                    }}
                    value={value}
                    onChange={(value) => {
                      onChange(digitsFaToEn(value));
                    }}
                    numInputs={6}
                    inputType={isMobile ? 'tel' : 'text'}
                    renderInput={(props) => <input {...props} />}
                  />
                  {!!error?.message && (
                    <FormHelperText error sx={{ textAlign: 'center' }}>
                      {error.message as string}
                    </FormHelperText>
                  )}
                </>
              );
            }}
          />
          <Stack justifyContent="space-between" direction="row">
            <Countdown
              date={Date.now() + 60 * 1000}
              renderer={(props) => {
                return (
                  <Button
                    color="warning"
                    variant="outlined"
                    startIcon={<HourglassTopOutlined />}
                    disabled={!props.completed}
                    onClick={handleClickOnSendAgain}
                    sx={{
                      width: 'fit-content',
                    }}
                  >
                    {props.completed
                      ? t('pages.confirm.buttons.sendAgain')
                      : `${props.total / 1000} ${t(
                          'pages.confirm.seconds',
                        )} ${t('pages.confirm.sendAgainText')}`}
                  </Button>
                );
              }}
            />

            <Button
              LinkComponent={Link}
              href={SIGN_IN_PAGE_PATHNAME}
              variant="outlined"
              color="warning"
              startIcon={<Edit />}
            >
              {t('pages.confirm.buttons.edit')}
            </Button>
          </Stack>
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
          {t('pages.login.buttons.login')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Page;
