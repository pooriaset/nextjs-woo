'use client';

import CartItem from '@/components/CartItem/CartItem';
import CartItemController from '@/components/CartItemController/CartItemController';
import OutOfStock from '@/components/common/OutOfStock';
import PriceLabel from '@/components/common/PriceLabel';
import { Z_INDEX_VALUES } from '@/config/responsive';
import { getFragmentData } from '@/graphql/types';
import {
  CartContentFragmentDoc,
  CartItemContentFragmentDoc,
  ProductContentSliceFragmentDoc,
  ProductVariationContentSliceFragmentDoc,
  StockStatusEnum,
} from '@/graphql/types/graphql';
import useCartQuery from '@/hooks/useCartQuery';
import { Link } from '@/navigation';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import Loading from '../loading';
import AppliedCoupons from './components/AppliedCoupons';
import CheckoutBox, { CheckoutBoxProps } from './components/CheckoutBox';
import DiscountCode from './components/DiscountCode';
import EmptyCart from './components/EmptyCart';
import Header from './components/Header';
import { extractNumbers } from '@/utils/price';

const Page = () => {
  const t = useTranslations();
  const { loading, data } = useCartQuery();

  if (loading) return <Loading />;

  const fragment = getFragmentData(CartContentFragmentDoc, data?.cart);

  if (!fragment?.contents?.itemCount) return <EmptyCart />;

  const fees =
    fragment?.fees?.map((fee) => {
      return {
        key: (
          <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
            {fee?.name}
          </Typography>
        ),
        value: (
          <PriceLabel
            value={Math.abs(fee?.total!)}
            TypographyProps={{
              fontWeight: 600,
              color: 'error',
            }}
          />
        ),
      };
    }) || [];

  const checkoutBoxItems: CheckoutBoxProps['items'] = [
    {
      key: (
        <Typography variant="body2" color="gray" sx={{ fontWeight: 600 }}>
          {t('pages.cart.box.subTotal')} ({fragment?.contents?.itemCount})
        </Typography>
      ),
      value: (
        <PriceLabel
          value={fragment.subtotal}
          TypographyProps={{
            fontWeight: 600,
            color: 'gray',
          }}
        />
      ),
    },
    ...fees,
    {
      key: (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {t('pages.cart.box.total')}
        </Typography>
      ),
      value: (
        <PriceLabel
          value={fragment.total}
          TypographyProps={{
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      key: (
        <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
          {t('pages.cart.box.yourProfit')}
        </Typography>
      ),
      value: (
        <PriceLabel
          value={
            extractNumbers(fragment?.discountTotal)! +
            extractNumbers(fragment?.feeTotal?.replace('-', ''))!
          }
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
      <Grid container spacing={2} position="relative">
        <Grid item lg={9} md={6} xs={12}>
          <Card variant="outlined">
            <Header />
            <CardContent>
              <Grid container spacing={2}>
                {fragment?.contents?.nodes?.map((item, index) => {
                  const isLast =
                    fragment?.contents?.nodes?.length === index + 1;
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
        </Grid>

        <Grid item lg={3} md={6} xs={12}>
          <Stack
            spacing={2}
            sx={{
              position: 'sticky',
              top: 196,
              zIndex: Z_INDEX_VALUES.cartPageDetailsBox,
            }}
          >
            <DiscountCode />

            {!!fragment?.appliedCoupons?.length && (
              <AppliedCoupons items={fragment?.appliedCoupons} />
            )}

            <Card variant="outlined">
              <CardContent>
                <CheckoutBox items={checkoutBoxItems} />
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  href="/checkout"
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
