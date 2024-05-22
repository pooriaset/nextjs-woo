import { GET_CART_QUERY } from '@/graphql/queries/cart';
import { getFragmentData } from '@/graphql/types';
import { CartContentFragmentDoc, GetCartQuery } from '@/graphql/types/graphql';
import { cartAtom } from '@/store/atoms';
import { useQuery } from '@apollo/client';
import { useSetAtom } from 'jotai';

const useCartQuery = () => {
  const setCart = useSetAtom(cartAtom);
  return useQuery<GetCartQuery>(GET_CART_QUERY, {
    onCompleted: (data) => {
      const cart = getFragmentData(CartContentFragmentDoc, data.cart);
      setCart({
        ...cart,
        productsCount: cart?.contents?.nodes.length ?? 0,
      });
    },
    fetchPolicy: 'network-only',
  });
};

export default useCartQuery;
