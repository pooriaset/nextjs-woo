import { authClient } from '@/graphql/clients/authClient';
import { EMPTY_CART_MUTATION } from '@/graphql/queries/cart';
import { RemoveItemsFromCartMutation } from '@/graphql/types/graphql';
import { cartAtom } from '@/store/atoms';
import { useMutation } from '@apollo/client';
import { useResetAtom } from 'jotai/utils';

export interface IUseEmptyCart {
  (): {
    emptyCartMutate: () => Promise<any>;
    emptyCartLoading: boolean;
  };
}

const useEmptyCart: IUseEmptyCart = () => {
  const reset = useResetAtom(cartAtom);

  const [emptyCartMutate, { loading }] =
    useMutation<RemoveItemsFromCartMutation>(EMPTY_CART_MUTATION, {
      client: authClient,
      onCompleted() {
        reset();
      },
    });

  return {
    emptyCartMutate,
    emptyCartLoading: loading,
  };
};

export default useEmptyCart;
