'use client';

import useCartQuery from '@/hooks/useCartQuery';
import { Link as NextLink } from '@/navigation';
import { cartAtom } from '@/store/atoms';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Header from './components/Header';

const Page = () => {
  const t = useTranslations();
  const { loading } = useCartQuery();

  const cart = useAtomValue(cartAtom);

  if (loading) {
    return <Skeleton />;
  }
  if (!cart?.contents?.itemCount) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mt: 5,
          gap: 2,
        }}
      >
        <Box
          sx={{
            opacity: 0.7,
            filter: 'grayscale(100%)',
          }}
        >
          <Image
            src="/assets/images/cart/unsuccess.svg"
            alt="NotFound"
            width={105}
            height={105}
          />
        </Box>
        <Typography variant="h6">{t('messages.cart.isEmpty')}</Typography>
        <NextLink href="/search">
          <Button variant="outlined">{t('buttons.products')}</Button>
        </NextLink>
      </Box>
    );
  }

  return (
    <>
      <Grid container>
        <Grid item lg={9} md={6} xs={12}>
          <Card variant="outlined">
            <Header />
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} xs={12}></Grid>
      </Grid>
    </>
  );
};

export default Page;
