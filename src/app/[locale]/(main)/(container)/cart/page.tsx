'use client';

import CartItem from '@/components/CartItem/CartItem';
import CartItemController from '@/components/CartItemController/CartItemController';
import OutOfStock from '@/components/common/OutOfStock';
import PriceLabel from '@/components/common/PriceLabel';
import { getFragmentData } from '@/graphql/types';
import {
  CartItemContentFragmentDoc,
  ProductContentSliceFragmentDoc,
  ProductVariationContentSliceFragmentDoc,
  StockStatusEnum,
} from '@/graphql/types/graphql';
import useCartQuery from '@/hooks/useCartQuery';
import { Link } from '@/navigation';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';

import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { cartAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import CartItemsSkeleton from './components/CartItemsSkeleton';
import CheckoutBox from './components/CheckoutBox';
import CheckoutBoxSkeleton from './components/CheckoutBoxSkeleton';
import EmptyCart from './components/EmptyCart';
import Header from './components/Header';

const Page = () => {
  const t = useTranslations();
  const { loading } = useCartQuery();

  const content = useAtomValue(cartAtom);

  if (!loading && !content?.contents?.itemCount) return <EmptyCart />;

  return (
    <Grid container spacing={2} position="relative">
      <Grid item lg={9} md={6} xs={12}>
        {loading && <CartItemsSkeleton />}
        {!loading && (
          <Card variant="outlined">
            <Header />
            <CardContent>
              <Grid container spacing={2}>
                {content?.contents?.nodes?.map((item, index) => {
                  const isLast = content?.contents?.nodes?.length === index + 1;
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
                          href={`/products/${product?.databaseId}/${product?.slug}`}
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

                          {!isOutOfStock && (
                            <Stack justifyContent="end">
                              {!!_item.totalOnSaleDiscount && (
                                <PriceLabel
                                  value={_item.totalOnSaleDiscount}
                                  TypographyProps={{
                                    fontWeight: 600,
                                    color: 'error',
                                  }}
                                  suffix={
                                    <Typography
                                      variant="caption"
                                      color="error"
                                      fontWeight={600}
                                    >
                                      {t('discounts.off')}
                                    </Typography>
                                  }
                                />
                              )}

                              <PriceLabel
                                value={_item.total}
                                TypographyProps={{
                                  sx: {
                                    fontWeight: 600,
                                  },
                                }}
                              />
                            </Stack>
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
        )}
      </Grid>

      <Grid item lg={3} md={6} xs={12}>
        <Stack
          spacing={2}
          sx={{
            position: 'sticky',
            top: 196,
            zIndex: (theme) => theme.zIndex.appBar - 1,
          }}
        >
          <Card variant="outlined">
            <CardContent>
              {loading ? (
                <CheckoutBoxSkeleton />
              ) : (
                <CheckoutBox content={content!} />
              )}
            </CardContent>
            <CardActions>
              <ButtonWithLoading
                isLoading={loading}
                component={Link}
                href="/checkout"
                fullWidth
                color="primary"
                size="large"
                variant="contained"
              >
                {t('pages.cart.buttons.registerAndNextStep')}
              </ButtonWithLoading>
            </CardActions>
          </Card>
          <Typography variant="body2" color="gray">
            {t('messages.cart.reserveMessage')}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Page;
