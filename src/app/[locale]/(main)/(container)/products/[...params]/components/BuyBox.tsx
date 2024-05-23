'use client';

import { useProductContext } from '@/app/[locale]/(main)/(container)/products/[...params]/hooks/useProductContext';
import { Variations } from '@/app/[locale]/(main)/(container)/products/types/common';
import ButtonWithLoading from '@/components/common/ButtonWithLoading';
import useAddOrUpdateCartItem from '@/hooks/useAddOrUpdateCartItem';
import { useAppContext } from '@/hooks/useAppContext';
import useCartUtils from '@/hooks/useCartUtils';
import {
  extractNumbers,
  getMinOfRangePrice,
  getProfitPercentage,
} from '@/utils/price';
import {
  AccountBalanceWalletOutlined,
  LocalShippingOutlined,
} from '@mui/icons-material';
import { Box, Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import DiscountPercentage from '../../../../../../../components/common/DiscountPercentage';
import OldPrice from '../../../../../../../components/common/OldPrice';
import PriceLabel from '../../../../../../../components/common/PriceLabel';
import AddToCartDialog from './AddToCartDialog';
import CartItemController from './CartItemController';

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
  variations: Variations;
}

const BuyBox: FC<BuyBoxProps> = ({ variations }) => {
  const { params } = useParams();

  const { isMobile } = useAppContext();
  const t = useTranslations();

  const { selectedVariantId } = useProductContext();

  const variant = variations?.nodes.find(
    (item) => item.id === selectedVariantId,
  );

  const profitMarginPercentage = getProfitPercentage(
    extractNumbers(getMinOfRangePrice(variant?.price)),
    extractNumbers(variant?.regularPrice),
  );

  const { addOrUpdateCartItemMutate, addOrUpdateCartItemLoading } =
    useAddOrUpdateCartItem();

  const [addToCartDialog, setAddToCartDialog] = useState(false);

  const handleOpenAddToCartDialog = () => {
    setAddToCartDialog(true);
  };

  const handleCloseAddToCartDialog = () => {
    setAddToCartDialog(false);
  };

  const handleClickOnAdd = async () => {
    await addOrUpdateCartItemMutate({
      quantity: 1,
      productId: +params[0],
      variationId: selectedVariantId!,
    });
    handleOpenAddToCartDialog();
  };

  const { findInCart } = useCartUtils();

  const itemInCart = findInCart({
    variationId: selectedVariantId!,
  });

  const height = 55;

  return (
    <>
      <AddToCartDialog
        open={addToCartDialog}
        onClose={handleCloseAddToCartDialog}
        data={variant!}
      />

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
            {variant?.price !== variant?.regularPrice && (
              <>
                <OldPrice
                  value={variant?.regularPrice}
                  TypographyProps={{
                    variant: 'body1',
                  }}
                />

                <DiscountPercentage value={profitMarginPercentage} />
              </>
            )}
          </Box>
          <PriceLabel
            TypographyProps={{
              variant: 'h6',
              fontWeight: 600,
            }}
            value={variant?.salePrice}
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
            <CartItemController item={itemInCart} height={height} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default BuyBox;
