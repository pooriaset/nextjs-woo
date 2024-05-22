import { EMPTY_CART_MUTATION } from '@/graphql/queries/cart';
import { RemoveItemsFromCartMutation } from '@/graphql/types/graphql';
import { cartAtom } from '@/store/atoms';
import { useMutation } from '@apollo/client';
import { useSetAtom } from 'jotai';

export interface IUseEmptyCart {
  (): {
    emptyCartMutate: () => Promise<any>;
    emptyCartLoading: boolean;
  };
}

const useEmptyCart: IUseEmptyCart = () => {
  const setCart = useSetAtom(cartAtom);

  const [emptyCartMutate, { loading }] =
    useMutation<RemoveItemsFromCartMutation>(EMPTY_CART_MUTATION, {
      onCompleted() {
        setCart(null);
      },
    });

  return {
    emptyCartMutate,
    emptyCartLoading: loading,
  };
};

export default useEmptyCart;
