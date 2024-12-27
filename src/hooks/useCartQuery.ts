import { GET_CART_QUERY } from '@/graphql/queries/cart';
import { GetCartQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import useCartUtils from './useCartUtils';
import { authClient } from '@/graphql/clients/authClient';

const useCartQuery = () => {
  const { setCartAtom } = useCartUtils();

  return useQuery<GetCartQuery>(GET_CART_QUERY, {
    onCompleted: (data) => {
      setCartAtom(data.cart);
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    client: authClient,
  });
};

export default useCartQuery;
