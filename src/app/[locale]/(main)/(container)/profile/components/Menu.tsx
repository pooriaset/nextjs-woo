import { authClient } from '@/graphql/clients/authClient';
import { GET_CUSTOMER_PROFILE } from '@/graphql/queries/customer';
import { GetCustomerProfileQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import useMenuItems from '../hooks/useMenuItems';
import MenuHeader from './MenuHeader';
import MenuItems from './MenuItems';

const Menu = () => {
  const { data, loading, error } = useQuery<GetCustomerProfileQuery>(
    GET_CUSTOMER_PROFILE,
    {
      client: authClient,
    },
  );

  const t = useTranslations();

  const fullName = data?.customer?.billing?.firstName
    ? data?.customer?.billing?.firstName +
      ' ' +
      data?.customer?.billing?.lastName
    : t('profile.user');

  const { items } = useMenuItems({
    ordersCount: data?.customer?.orderCount || 0,
  });
  return (
    <>
      <MenuHeader
        isLoading={!!error || loading}
        fullName={fullName}
        username={data?.customer?.username || ''}
      />

      <MenuItems items={items} />
    </>
  );
};

export default Menu;
