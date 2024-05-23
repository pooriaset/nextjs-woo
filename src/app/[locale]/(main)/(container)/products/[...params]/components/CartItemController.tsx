import { getFragmentData } from '@/graphql/types';
import {
  CartItemContentFragment,
  ProductContentSliceFragmentDoc,
  ProductVariationContentSliceFragmentDoc,
} from '@/graphql/types/graphql';
import useAddOrUpdateCartItem from '@/hooks/useAddOrUpdateCartItem';
import useRemoveCartItem from '@/hooks/useRmoveCartItem';
import { Link } from '@/navigation';
import { Add, DeleteOutline, Remove } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface CartItemControllerProps {
  item: CartItemContentFragment;
  height: number;
}

const CartItemController: FC<CartItemControllerProps> = ({ item, height }) => {
  const isDecreaseEnabled = item.quantity ? item.quantity > 1 : false;

  const variant = getFragmentData(
    ProductVariationContentSliceFragmentDoc,
    item.variation?.node,
  );

  const product = getFragmentData(
    ProductContentSliceFragmentDoc,
    item.product?.node,
  );

  const { removeCartItemMutate, removeCartItemMutateLoading } =
    useRemoveCartItem();

  const handleClickOnRemove = () => {
    removeCartItemMutate({ variationId: variant?.databaseId });
  };

  const { addOrUpdateCartItemMutate, addOrUpdateCartItemLoading } =
    useAddOrUpdateCartItem();

  const handleClickOnIncrease = () => {
    const quantity = item.quantity! + 1;
    addOrUpdateCartItemMutate({
      variationId: variant?.databaseId,
      productId: product?.databaseId!,
      quantity,
    });
  };
  const handleClickOnDecrease = () => {
    const quantity = item.quantity! - 1;
    addOrUpdateCartItemMutate({
      variationId: variant?.databaseId,
      productId: product?.databaseId!,
      quantity,
    });
  };

  const isLoading = removeCartItemMutateLoading || addOrUpdateCartItemLoading;

  const t = useTranslations();

  return (
    <Stack spacing={1} justifyContent="center">
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContent="center"
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          height,
          borderRadius: 1,
        }}
      >
        <IconButton
          onClick={handleClickOnIncrease}
          size="large"
          disabled={isLoading}
          color="primary"
        >
          <Add />
        </IconButton>

        <Box
          sx={{
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            color="primary"
            sx={{
              fontWeight: 700,
            }}
          >
            {isLoading ? <CircularProgress size={20} /> : item.quantity}
          </Typography>
        </Box>

        {isDecreaseEnabled && (
          <IconButton
            onClick={handleClickOnDecrease}
            size="large"
            disabled={isLoading}
            color="primary"
          >
            <Remove />
          </IconButton>
        )}
        <IconButton
          onClick={handleClickOnRemove}
          size="large"
          disabled={isLoading}
          color="error"
        >
          <DeleteOutline />
        </IconButton>
      </Stack>
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
    </Stack>
  );
};

export default CartItemController;
