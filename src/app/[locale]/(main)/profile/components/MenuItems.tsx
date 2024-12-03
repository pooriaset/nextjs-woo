import { Link } from '@/navigation';
import { PersonOutline, ShoppingBagOutlined } from '@mui/icons-material';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const MenuItems = () => {
  const t = useTranslations();

  const items = [
    {
      label: t('profile.myOrders'),
      href: '/profile/orders',
      icon: ShoppingBagOutlined,
    },
    {
      label: t('profile.accountInfo'),
      href: '/profile/information',
      icon: PersonOutline,
    },
  ];

  const pathname = usePathname();

  return (
    <nav aria-label="profile menu">
      <List disablePadding>
        <Divider />
        {items.map((item) => {
          return (
            <>
              <ListItem disablePadding key={item.href}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={pathname === item.href}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </nav>
  );
};

export default MenuItems;
