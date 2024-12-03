import { Link } from '@/navigation';
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

export interface MenuItem {
  label: string;
  href: string;
  icon: any;
  count?: number;
}

export interface MenuItemsProps {
  items: MenuItem[];
}

const MenuItems: FC<MenuItemsProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <nav aria-label="profile menu">
      <List disablePadding>
        <Divider />
        {items.map((item) => {
          return (
            <>
              <ListItem
                disablePadding
                key={item.href}
                secondaryAction={
                  !!item.count && (
                    <Chip
                      sx={{
                        width: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      size="small"
                      label={item.count}
                    />
                  )
                }
              >
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
