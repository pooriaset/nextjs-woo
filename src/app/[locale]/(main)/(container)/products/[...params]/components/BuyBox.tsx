'use client';

import { useProductContext } from '@/app/[locale]/(main)/(container)/products/[...params]/hooks/useProductContext';
import CartItemController from '@/components/CartItemController/CartItemController';
import useNewDialog from '@/components/Dialog/hooks/useNewDialog';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import { getFragmentData } from '@/graphql/types';
import {
  GetSingleProductQuery,
  ProductVariationContentSliceFragmentDoc,
  StockStatusEnum,
} from '@/graphql/types/graphql';
import useAddOrUpdateCartItem from '@/hooks/useAddOrUpdateCartItem';
import { useAppContext } from '@/hooks/useAppContext';
import useCartUtils from '@/hooks/useCartUtils';
import { Link } from '@/navigation';
import {
  extractNumbers,
  getMinOfRangePrice,
  getProfitPercentage,
} from '@/utils/price';
import {
  AccountBalanceWalletOutlined,
  LocalShippingOutlined,
} from '@mui/icons-material';
import { Box, Collapse, Divider, Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import DiscountPercentage from '../../../../../../../components/common/DiscountPercentage';
import OldPrice from '../../../../../../../components/common/OldPrice';
import PriceLabel from '../../../../../../../components/common/PriceLabel';
import AddToCartDialog from './AddToCartDialog';

const listItems = [
  {
    text: 'ارسال از دو روز کاری دیگر',
    icon: <LocalShippingOutlined />,
  },
  {
    text: '5% بازگشت به اعتبار',
    icon: <AccountBalanceWalletOutlined />,
  },
];

export interface BuyBoxProps {
  product: Extract<
    NonNullable<GetSingleProductQuery['product']>,
    { __typename?: 'VariableProduct' }
  >;
}

const BuyBox: FC<BuyBoxProps> = ({ product }) => {
  const { params } = useParams();

  const { isMobile } = useAppContext();
  const t = useTranslations();

  const { selectedVariantId } = useProductContext();

  const _variant = useMemo(() => {
    if (!selectedVariantId) {
      return null;
    }

    return product.variations?.nodes.find((item) => {
      const fragment = getFragmentData(
        ProductVariationContentSliceFragmentDoc,
        item,
      );

      return fragment.databaseId === selectedVariantId;
    });
  }, [selectedVariantId]);

  const variant = getFragmentData(
    ProductVariationContentSliceFragmentDoc,
    _variant,
  );

  const profitMarginPercentage = getProfitPercentage(
    extractNumbers(getMinOfRangePrice(variant?.price)),
    extractNumbers(variant?.regularPrice),
  );

  const { addOrUpdateCartItemMutate, addOrUpdateCartItemLoading } =
    useAddOrUpdateCartItem();

  const { handleCloseDialog, handleOpenDialog, open } = useNewDialog();

  const handleClickOnAdd = async () => {
    const data = await addOrUpdateCartItemMutate({
      quantity: 1,
      productId: +params[0],
      variationId: selectedVariantId!,
    });
    if (data) {
      handleOpenDialog();
    }
  };

  const { findInCart } = useCartUtils();

  const itemInCart = findInCart({
    variationId: selectedVariantId!,
  });

  const height = 55;

  const isOutOfStock = product.stockStatus === StockStatusEnum.OutOfStock;

  const discountPercentage =
    (variant === null && product?.discountPercentage) ||
    (variant !== null && variant?.discountPercentage);

  return (
    <>
      <AddToCartDialog
        open={open}
        onClose={handleCloseDialog}
        value={variant!}
      />

      {isOutOfStock ? (
        <Typography
          color="error"
          variant="h6"
          sx={{
            textAlign: 'center',
          }}
        >
          {t('products.outOfStock')}
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
          }}
        >
          <List>
            {listItems.map((item) => {
              return (
                <>
                  <ListItem
                    disablePadding
                    sx={{
                      py: 1,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 1,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: (theme) => theme.typography.caption.fontSize,
                      }}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
              }}
            >
              {!!discountPercentage && (
                <>
                  <OldPrice
                    value={
                      variant ? variant?.regularPrice : product.regularPrice
                    }
                    TypographyProps={{
                      variant: 'body1',
                    }}
                  />

                  <DiscountPercentage
                    value={
                      variant
                        ? variant.discountPercentage
                        : product.discountPercentage
                    }
                  />
                </>
              )}
            </Box>
            <PriceLabel
              TypographyProps={{
                variant: 'h6',
                fontWeight: 600,
              }}
              value={variant ? variant.price : product.price}
            />
          </Box>

          <Box>
            {/* TODO: Handle out of stock state */}
            {!itemInCart && (
              <ButtonWithLoading
                isLoading={addOrUpdateCartItemLoading}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClickOnAdd}
                sx={{ minHeight: height }}
              >
                {t('buttons.addToCart')}
              </ButtonWithLoading>
            )}

            {itemInCart && (
              <>
                <Box height={height}>
                  <CartItemController item={itemInCart} />
                </Box>
                <Collapse appear in={true}>
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <Typography variant="body2">
                      {t('pages.product.buyBox.inYourCart')}
                    </Typography>
                    <Link href="/cart">
                      <Typography color="primary" variant="body2">
                        {t('pages.product.buyBox.viewCart')}
                      </Typography>
                    </Link>
                  </Stack>
                </Collapse>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default BuyBox;
