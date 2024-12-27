import {
  HomeOutlined,
  LogoutOutlined,
  PersonOutline,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { IMenuItem } from '../components/MenuItems';
import { usePathname, useRouter } from '@/navigation';
import { signOut } from 'next-auth/react';
import { protectedRoutes } from '@/config/app';
import { useTransition } from 'react';

export interface IUseMenuItems {
  (props?: { ordersCount: number }): {
    items: IMenuItem[];
  };
}
const useMenuItems: IUseMenuItems = (props) => {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    startTransition(async () => {
      await signOut({ redirect: false });
      if (protectedRoutes.some((route) => pathname.includes(route))) {
        router.push('/');
      }
    });
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
      isLoading: isPending,
    },
  ];
  return { items };
};

export default useMenuItems;
