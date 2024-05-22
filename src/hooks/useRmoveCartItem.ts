import { REMOVE_ITEMS_FROM_CART_MUTATION } from '@/graphql/queries/cart';
import { getFragmentData } from '@/graphql/types';
import {
  CartContentFragmentDoc,
  CartItemContentFragmentDoc,
  GetCartQuery,
  ProductVariationContentSliceFragmentDoc,
  RemoveItemsFromCartMutation,
} from '@/graphql/types/graphql';
import { ICartAtom, cartAtom } from '@/store/atoms';
import { useMutation } from '@apollo/client';
import { useAtom } from 'jotai';

export interface RemoveCartItemMutate {
  (values: { variationId: number }): Promise<any>;
}

export interface IUseRemoveCartItem {
  (): {
    removeCartItemMutate: RemoveCartItemMutate;
    removeCartItemMutateLoading: boolean;
  };
}

const useRemoveCartItem: IUseRemoveCartItem = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const findInCart = ({ variationId }: { variationId: number }) => {
    cart?.contents?.nodes.find((item) => {
      const { variation } = getFragmentData(CartItemContentFragmentDoc, item);
      const productContent = getFragmentData(
        ProductVariationContentSliceFragmentDoc,
        variation?.node,
      )!;
      return productContent?.databaseId == variationId;
    });

    return { quantity: 0, key: 0 };
  };

  const setCartAtom = (value: GetCartQuery['cart']) => {
    const _value: ICartAtom = {
      ...value,
      productsCount:
        getFragmentData(CartContentFragmentDoc, value)?.contents?.nodes
          ?.length ?? 0,
    };

    setCart(_value);
  };

  const [removeCartItem, { loading }] =
    useMutation<RemoveItemsFromCartMutation>(REMOVE_ITEMS_FROM_CART_MUTATION, {
      onCompleted({ removeItemsFromCart: data }) {
        if (data?.cart) {
          setCartAtom(data.cart);
        }
      },
    });

  const removeCartItemMutate: RemoveCartItemMutate = async ({
    variationId,
  }) => {
    const quantityFound = findInCart({ variationId })?.quantity || 0;

    if (!quantityFound) {
      throw new Error('Provided item not in cart');
    }

    const item = findInCart({ variationId });

    if (!item) {
      throw new Error('Failed to find item in cart.');
    }

    const { key } = item;
    return removeCartItem({ variables: { keys: [key], all: false } });
  };

  return {
    removeCartItemMutate,
    removeCartItemMutateLoading: loading,
  };
};

export default useRemoveCartItem;
