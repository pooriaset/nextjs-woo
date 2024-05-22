import { getFragmentData } from '@/graphql/types';
import {
  CartContentFragmentDoc,
  CartItemContentFragmentDoc,
  GetCartQuery,
  ProductVariationContentSliceFragmentDoc,
} from '@/graphql/types/graphql';
import { ICartAtom, cartAtom } from '@/store/atoms';
import { useAtom } from 'jotai';

export interface ReturnTypeOfUseCartUtils {
  findInCart: (args: { variationId: number }) => {
    quantity: number;
    key: string;
  };
  setCartAtom: (value: GetCartQuery['cart']) => void;
}

export interface IUseCartUtils {
  (): ReturnTypeOfUseCartUtils;
}

const useCartUtils: IUseCartUtils = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const findInCart: ReturnTypeOfUseCartUtils['findInCart'] = ({
    variationId,
  }) => {
    cart?.contents?.nodes.find((item) => {
      const { variation } = getFragmentData(CartItemContentFragmentDoc, item);
      const productContent = getFragmentData(
        ProductVariationContentSliceFragmentDoc,
        variation?.node,
      )!;
      return productContent?.databaseId == variationId;
    });

    return { quantity: 0, key: '' };
  };

  const setCartAtom: ReturnTypeOfUseCartUtils['setCartAtom'] = (value) => {
    const _value: ICartAtom = {
      ...value,
      productsCount:
        getFragmentData(CartContentFragmentDoc, value)?.contents?.nodes
          ?.length ?? 0,
    };

    setCart(_value);
  };

  return {
    findInCart,
    setCartAtom,
  };
};

export default useCartUtils;
