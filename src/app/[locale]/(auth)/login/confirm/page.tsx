'use client';

import Logo from '@/components/common/Logo';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import OtpInput from 'react-otp-input';
import { grey, red } from '@mui/material/colors';
import { digitsFaToEn } from '@persian-tools/persian-tools';
import { Edit } from '@mui/icons-material';
import { Link } from '@/navigation';
import { useAppContext } from '@/hooks/useAppContext';

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
                      justifyContent: 'center',
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
            <Button variant="text" size="small" color="warning">
              {t('pages.confirm.buttons.sendAgain')}
            </Button>
            <Button
              LinkComponent={Link}
              href="/login"
              variant="text"
              size="small"
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
