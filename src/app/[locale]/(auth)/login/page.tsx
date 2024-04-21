import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import Logo from '@/components/common/Logo';

const Page = () => {
  const t = useTranslations();

  const onSubmit = () => {};
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
      }}
    >
      <CardContent component="form" onSubmit={onSubmit}>
        <Stack spacing={1}>
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
              {t('pages.login.title')}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body2">{t('pages.login.hello')}</Typography>
            <Typography variant="body2">{t('pages.login.message')}</Typography>
          </Stack>
          <TextField
            variant="outlined"
            fullWidth
            dir="ltr"
            placeholder={t('pages.login.phoneNumber')}
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
          {t('pages.login.buttons.login')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Page;
