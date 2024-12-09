import {
  HomeOutlined,
  LogoutOutlined,
  PersonOutline,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { MenuItem } from '../components/MenuItems';
import { usePathname, useRouter } from '@/navigation';
import { signOut } from 'next-auth/react';
import { protectedRoutes } from '@/config/app';

export interface IUseMenuItems {
  (props?: { ordersCount: number }): {
    items: MenuItem[];
  };
}
const useMenuItems: IUseMenuItems = (props) => {
  const t = useTranslations();

  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    if (protectedRoutes.some((route) => pathname.includes(route))) {
      router.push('/');
    }
  };

  const items = [
    {
      label: t('profile.activitySummary'),
      href: '/profile',
      icon: HomeOutlined,
    },
    {
      label: t('profile.myOrders'),
      href: '/profile/orders',
      icon: ShoppingBagOutlined,
      count: props?.ordersCount,
    },
    {
      label: t('profile.accountInfo'),
      href: '/profile/information',
      icon: PersonOutline,
    },
    {
      label: t('profile.logout'),
      onClick: handleLogout,
      icon: LogoutOutlined,
    },
  ];
  return { items };
};

export default useMenuItems;
