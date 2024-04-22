'use client';

import {
  AccountCircleOutlined,
  CategoryOutlined,
  HomeOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';
import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Page {
  label: string;
  href: string;
  icon: ReactNode;
}

const MobileFooter = () => {
  const pathname = usePathname();
  const t = useTranslations();

  const pages: Page[] = [
    {
      label: t('footer.navigation.home'),
      href: '/',
      icon: <HomeOutlined />,
    },
    {
      label: t('footer.navigation.categories'),
      href: '/categories',
      icon: <CategoryOutlined />,
    },
    {
      label: t('footer.navigation.cart'),
      href: '/cart',
      icon: <ShoppingBasketOutlined />,
    },
    {
      label: t('footer.navigation.myAccount'),
      href: '/account',
      icon: <AccountCircleOutlined />,
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        boxShadow: (theme) => theme.shadows[3],
      }}
    >
      <MuiBottomNavigation
        showLabels
        value={pages.findIndex((page) => page.href === pathname)}
      >
        {pages.map((page) => {
          return (
            <BottomNavigationAction
              key={page.label}
              href={page.href}
              label={page.label}
              icon={page.icon}
            />
          );
        })}
      </MuiBottomNavigation>
    </Box>
  );
};

export default MobileFooter;
