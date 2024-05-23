import { REMOVE_ITEMS_FROM_CART_MUTATION } from '@/graphql/queries/cart';
import { RemoveItemsFromCartMutation } from '@/graphql/types/graphql';
import { useMutation } from '@apollo/client';
import useCartUtils from './useCartUtils';

export interface RemoveCartItemMutate {
  (values: { variationId: number | undefined }): Promise<any>;
}

export interface IUseRemoveCartItem {
  (): {
    removeCartItemMutate: RemoveCartItemMutate;
    removeCartItemMutateLoading: boolean;
  };
}

const useRemoveCartItem: IUseRemoveCartItem = () => {
  const { findInCart, setCartAtom } = useCartUtils();

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
    if (!variationId) {
      throw new Error('Variation  id is undefined.');
    }

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
