import { getFragmentData } from '@/graphql/types';
import {
  CartItemContentFragment,
  CartItemContentFragmentDoc,
  GetCartQuery,
  ProductVariationContentSliceFragmentDoc,
} from '@/graphql/types/graphql';
import { ICartAtom, cartAtom } from '@/store/atoms';
import { useAtom } from 'jotai';

export interface ReturnTypeOfUseCartUtils {
  findInCart: (args: { variationId: number }) => CartItemContentFragment | null;
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
    const item = cart?.contents?.nodes.find((item) => {
      const { variation } = getFragmentData(CartItemContentFragmentDoc, item);
      const productContent = getFragmentData(
        ProductVariationContentSliceFragmentDoc,
        variation?.node,
      )!;
      return productContent?.databaseId == variationId;
    });

    if (!item) {
      return null;
    }

    return getFragmentData(CartItemContentFragmentDoc, item);
  };

  const setCartAtom: ReturnTypeOfUseCartUtils['setCartAtom'] = (value) => {
    const _value: ICartAtom = {
      ...(value as any),
    };

    setCart(_value);
  };

  return {
    findInCart,
    setCartAtom,
  };
};

export default useCartUtils;
