import {
  ADD_TO_CART_MUTATION,
  UPDATE_CART_ITEMS_QUANTITIES_MUTATION,
} from '@/graphql/queries/cart';
import { getFragmentData } from '@/graphql/types';
import {
  AddToCartMutation,
  CartContentFragmentDoc,
  CartItemContentFragmentDoc,
  GetCartQuery,
  ProductVariationContentSliceFragmentDoc,
  UpdateCartItemQuantitiesMutation,
} from '@/graphql/types/graphql';
import { ICartAtom, cartAtom } from '@/store/atoms';
import { useMutation } from '@apollo/client';
import { useAtom } from 'jotai';

export interface MutateCartFunction {
  (values: {
    quantity: number;
    productId: number;
    variationId: number;
    extraData?: any;
  }): Promise<any>;
}

export interface IUseAddOrUpdateCartItem {
  (): {
    addOrUpdateCartItemLoading: boolean;
    addOrUpdateCartItemMutate: MutateCartFunction;
  };
}

const useAddOrUpdateCartItem: IUseAddOrUpdateCartItem = () => {
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

  const [addToCart, { loading: addToCartLoading }] =
    useMutation<AddToCartMutation>(ADD_TO_CART_MUTATION, {
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
        onCompleted({ updateItemQuantities: data }) {
          if (data?.cart) {
            setCartAtom(data.cart);
          }
        },
      },
    );

  const addOrUpdateCartItemMutate: MutateCartFunction = async (values) => {
    const { quantity, variationId, productId, extraData } = values;
    const quantityFound = findInCart({ variationId })?.quantity || 0;

    if (quantityFound) {
      const item = findInCart({ variationId });

      if (!item) {
        throw new Error('Failed to find item in cart.');
      }

      const { key } = item;
      return updateQuantity({ variables: { items: [{ key, quantity }] } });
    } else {
      return addToCart({
        variables: {
          productId,
          variationId,
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
