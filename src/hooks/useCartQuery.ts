import { GET_CART_QUERY } from '@/graphql/queries/cart';
import { GetCartQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import useCartUtils from './useCartUtils';

const useCartQuery = () => {
  const { setCartAtom } = useCartUtils();

  return useQuery<GetCartQuery>(GET_CART_QUERY, {
    onCompleted: (data) => {
      setCartAtom(data.cart);
    },
    fetchPolicy: 'network-only',
  });
};

export default useCartQuery;