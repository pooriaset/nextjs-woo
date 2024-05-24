'use client';

import CartItem from '@/components/CartItem/CartItem';
import CartItemController from '@/components/CartItemController/CartItemController';
import { getFragmentData } from '@/graphql/types';
import {
  CartItemContentFragmentDoc,
  ProductContentSliceFragmentDoc,
  ProductVariationContentSliceFragmentDoc,
  StockStatusEnum,
} from '@/graphql/types/graphql';
import useCartQuery from '@/hooks/useCartQuery';
import { Link as NextLink } from '@/navigation';
import { cartAtom } from '@/store/atoms';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Header from './components/Header';
import CartItemSkeleton from '@/components/CartItem/components/CartItemSkeleton';
import OutOfStock from '@/components/common/OutOfStock';
import CheckoutBox, { CheckoutBoxProps } from './components/CheckoutBox';
import PriceLabel from '@/components/common/PriceLabel';

const Page = () => {
  const t = useTranslations();
  const { loading } = useCartQuery();

  const cart = useAtomValue(cartAtom);

  if (loading) {
    const skeletonLength = 4;
    return (
      <Grid container spacing={2}>
        <Grid item lg={9} md={6} xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                {new Array(skeletonLength).fill(0).map((item, index) => {
                  const isLast = skeletonLength === index + 1;
                  return (
                    <Grid item xs={12} key={index}>
                      <Stack spacing={2}>
                        <CartItemSkeleton />
                        {!isLast && <Divider />}
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={6} xs={12}>
          <Stack spacing={2}>
            <Card variant="outlined">
              <CardContent>
                <Skeleton variant="rectangular" height={400} />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    );
  }

  if (!cart?.contents?.itemCount) {
    const links = [
      {
        title: t('buttons.products'),
        href: '/search',
      },
      {
        title: t('header.navigation.bestSelling'),
        href: '/best-selling',
      },
      {
        title: t('header.navigation.categories'),
        href: '/categories',
      },
    ];

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
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
        <Typography variant="caption">
          {t('messages.cart.shortDescription')}
        </Typography>
        <Stack spacing={2} direction="row">
          {links.map((link) => {
            return (
              <NextLink href={link.href} key={link.href}>
                <Button variant="outlined">{link.title}</Button>
              </NextLink>
            );
          })}
        </Stack>
      </Box>
    );
  }

  const checkoutBoxItems: CheckoutBoxProps['items'] = [
    {
      key: (
        <Typography variant="body2" color="gray" sx={{ fontWeight: 600 }}>
          قیمت کالاها ({cart?.contents?.itemCount})
        </Typography>
      ),
      value: (
        <PriceLabel
          value={cart.subtotal}
          TypographyProps={{
            fontWeight: 600,
            color: 'gray',
          }}
        />
      ),
    },
    {
      key: (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          جمع سبد خرید
        </Typography>
      ),
      value: (
        <PriceLabel
          value={cart.total}
          TypographyProps={{
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      key: (
        <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
          سود شما از خرید
        </Typography>
      ),
      value: (
        <PriceLabel
          value={cart.discountTotal}
          TypographyProps={{
            fontWeight: 600,
            color: 'error',
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={9} md={6} xs={12}>
          <Card variant="outlined">
            <Header />
            <CardContent>
              <Grid container spacing={2}>
                {cart?.contents?.nodes?.map((item, index) => {
                  const isLast = cart?.contents?.nodes?.length === index + 1;
                  const _item = getFragmentData(
                    CartItemContentFragmentDoc,
                    item,
                  );

                  const variant = getFragmentData(
                    ProductVariationContentSliceFragmentDoc,
                    _item.variation?.node,
                  )!;

                  const product = getFragmentData(
                    ProductContentSliceFragmentDoc,
                    _item.product?.node,
                  );

                  const isOutOfStock =
                    variant.stockStatus === StockStatusEnum.OutOfStock;

                  return (
                    <Grid item xs={12} key={_item?.key}>
                      <Stack spacing={2}>
                        <CartItem
                          value={variant}
                          href={`/products/${product?.databaseId}`}
                        />
                        <Stack direction="row" spacing={1}>
                          <Box width={200}>
                            <CartItemController
                              item={_item}
                              disabled={isOutOfStock}
                            />
                          </Box>
                          {isOutOfStock && (
                            <OutOfStock
                              sx={{
                                color: 'red',
                                borderColor: 'error',
                                width: 'fit-content',
                              }}
                            />
                          )}
                        </Stack>
                        {!isLast && <Divider />}
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={6} xs={12}>
          <Stack spacing={2}>
            <Card variant="outlined">
              <CardContent>
                <CheckoutBox items={checkoutBoxItems} />
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  color="primary"
                  size="large"
                  variant="contained"
                >
                  {t('pages.cart.buttons.registerAndNextStep')}
                </Button>
              </CardActions>
            </Card>
            <Typography variant="body2" color="gray">
              {t('messages.cart.reserveMessage')}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
