'use client';

import { Z_INDEX_VALUES } from '@/config/responsive';
import { cartAtom } from '@/store/atoms';
import {
  AccountCircleOutlined,
  CategoryOutlined,
  HomeOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';
import { Badge, BadgeProps, styled } from '@mui/material';
import MuiBottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { useAtomValue } from 'jotai';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Page {
  label: string;
  href: string;
  icon: ReactNode;
}

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 12,
  },
}));

const MobileFooter = () => {
  const session = useSession();
  const pathname = usePathname();
  const t = useTranslations();
  const cart = useAtomValue(cartAtom);

  const isAuthenticated = session.status === 'authenticated';

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
      icon: (
        <StyledBadge badgeContent={cart?.contents?.itemCount} color="error">
          <ShoppingBasketOutlined />
        </StyledBadge>
      ),
    },
    {
      label: t('footer.navigation.myAccount'),
      href: isAuthenticated ? '/profile' : '/account/signin',
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
        zIndex: Z_INDEX_VALUES.mobileFooter,
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
