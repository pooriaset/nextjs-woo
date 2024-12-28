'use client';

import { useProductContext } from '@/app/[locale]/(main)/(container)/products/[...params]/hooks/useProductContext';
import CartItemController from '@/components/CartItemController/CartItemController';
import useNewDialog from '@/components/Dialog/hooks/useNewDialog';
import { DesktopView, MobileView } from '@/components/ResponsiveDesign';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import DiscountPercentage from '@/components/common/DiscountPercentage';
import OldPrice from '@/components/common/OldPrice';
import PriceLabel from '@/components/common/PriceLabel';
import { getFragmentData } from '@/graphql/types';
import {
  GetSingleProductQuery,
  ProductVariationContentSliceFragment,
  ProductVariationContentSliceFragmentDoc,
  StockStatusEnum,
} from '@/graphql/types/graphql';
import useAddOrUpdateCartItem from '@/hooks/useAddOrUpdateCartItem';
import useCartUtils from '@/hooks/useCartUtils';
import { Link } from '@/navigation';
import { getMaxOfRangePrice } from '@/utils/price';
import { Box, Collapse, Divider, Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC, Fragment, ReactNode } from 'react';
import AddToCartDialog from './AddToCartDialog';
import MobileBuyBox from './MobileBuyBox';

const features: { id: string; text: string; icon: ReactNode }[] = [];

export interface BuyBoxProps {
  product: Extract<
    NonNullable<GetSingleProductQuery['product']>,
    { __typename?: 'VariableProduct' }
  >;
}

const BuyBox: FC<BuyBoxProps> = ({ product }) => {
  const { params } = useParams();

  const t = useTranslations();

  const { selectedVariantId } = useProductContext();

  let variant: ProductVariationContentSliceFragment | null | undefined = null;
  if (selectedVariantId) {
    const _variant = product.variations?.nodes.find((item) => {
      const fragment = getFragmentData(
        ProductVariationContentSliceFragmentDoc,
        item,
      );

      return fragment.databaseId === selectedVariantId;
    });

    variant = getFragmentData(
      ProductVariationContentSliceFragmentDoc,
      _variant,
    );
  }

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
      setTimeout(() => {
        handleCloseDialog();
      }, 4000);
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

  const priceSection = (
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
                variant
                  ? variant?.regularPrice
                  : getMaxOfRangePrice(product.regularPrice)
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
  );

  const controllerSection = (
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
  );

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
          {!!features?.length && (
            <List>
              {features.map((item, index) => {
                return (
                  <Fragment key={item.id}>
                    <ListItem>
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
                          fontSize: (theme) =>
                            theme.typography.caption.fontSize,
                        }}
                      />
                    </ListItem>
                    {index !== features.length - 1 && <Divider />}
                  </Fragment>
                );
              })}
            </List>
          )}

          <MobileView>
            <MobileBuyBox>
              <Box width="60%">{controllerSection}</Box>
              {priceSection}
            </MobileBuyBox>
          </MobileView>

          <DesktopView>
            {priceSection}
            {controllerSection}
          </DesktopView>
        </Box>
      )}
    </>
  );
};

export default BuyBox;
