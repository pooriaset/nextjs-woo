'use client';

import {
  ADD_TO_CART_MUTATION,
  UPDATE_CART_ITEMS_QUANTITIES_MUTATION,
} from '@/graphql/queries/cart';
import {
  AddToCartMutation,
  UpdateCartItemQuantitiesMutation,
} from '@/graphql/types/graphql';
import { useMutation } from '@apollo/client';
import useCartUtils from './useCartUtils';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { authClient } from '@/graphql/clients/authClient';

export interface MutateCartFunction {
  (values: {
    quantity: number;
    productId: number;
    variationId: number | string | undefined | null;
    extraData?: any;
  }): Promise<any> | null;
}

export interface IUseAddOrUpdateCartItem {
  (): {
    addOrUpdateCartItemLoading: boolean;
    addOrUpdateCartItemMutate: MutateCartFunction;
  };
}

const useAddOrUpdateCartItem: IUseAddOrUpdateCartItem = () => {
  const t = useTranslations();
  const { findInCart, setCartAtom } = useCartUtils();

  const [addToCart, { loading: addToCartLoading }] =
    useMutation<AddToCartMutation>(ADD_TO_CART_MUTATION, {
      client: authClient,
      onCompleted({ addToCart: data }) {
        if (data?.cart) {
          setCartAtom(data.cart);
        }
      },
    });

  const [updateQuantity, { loading: updateQuantityLoading }] =
    useMutation<UpdateCartItemQuantitiesMutation>(
      UPDATE_CART_ITEMS_QUANTITIES_MUTATION,
      {
        client: authClient,
        onCompleted({ updateItemQuantities: data }) {
          if (data?.cart) {
            setCartAtom(data.cart);
          }
        },
      },
    );

  const addOrUpdateCartItemMutate: MutateCartFunction = async (values) => {
    const { quantity, variationId, productId, extraData } = values;

    if (!variationId) {
      toast.error(t('messages.cart.selectYourSize'));
      return null;
    }

    const _variationId = +variationId;

    const quantityFound =
      findInCart({ variationId: _variationId })?.quantity || 0;

    if (quantityFound) {
      const item = findInCart({ variationId: _variationId });

      if (!item) {
        throw new Error('Failed to find item in cart.');
      }

      const { key } = item;

      return updateQuantity({ variables: { items: [{ key, quantity }] } });
    } else {
      return addToCart({
        variables: {
          productId,
          variationId: _variationId,
          quantity,
          extraData,
        },
      });
    }
  };

  return {
    addOrUpdateCartItemMutate,
    addOrUpdateCartItemLoading: addToCartLoading || updateQuantityLoading,
  };
};

export default useAddOrUpdateCartItem;
