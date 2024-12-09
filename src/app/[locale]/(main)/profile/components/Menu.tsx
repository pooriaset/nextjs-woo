import { GET_CUSTOMER_PROFILE } from '@/graphql/queries/customer';
import { GetCustomerProfileQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import useMenuItems from '../hooks/useMenuItems';
import MenuHeader from './MenuHeader';
import MenuItems from './MenuItems';

const Menu = () => {
  const { data, loading, error } =
    useQuery<GetCustomerProfileQuery>(GET_CUSTOMER_PROFILE);

  const t = useTranslations();

  const fullName = data?.customer?.firstName
    ? data?.customer?.firstName + ' ' + data?.customer?.lastName
    : t('profile.user');

  const { items } = useMenuItems({
    ordersCount: data?.customer?.orderCount || 0,
  });
  return (
    <Box
      sx={{
        width: 260,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <MenuHeader
        isLoading={!!error || loading}
        fullName={fullName}
        username={data?.customer?.username || ''}
      />

      <MenuItems items={items} />
    </Box>
  );
};

export default Menu;
