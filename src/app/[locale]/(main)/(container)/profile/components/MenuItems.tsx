import { Link } from '@/navigation';
import {
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { FC, Fragment } from 'react';

export interface MenuItem {
  label: string;
  href?: string;
  icon: any;
  count?: number;
  onClick?: () => void;
  isLoading?: boolean;
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
        {items.map((item, index) => {
          return (
            <Fragment key={item.href}>
              <ListItem
                disablePadding
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
                  onClick={item.onClick}
                  {...(item.href ? { component: Link, href: item.href } : {})}
                  selected={pathname === item.href}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                    }}
                  >
                    {item.isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      <item.icon />
                    )}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {items.length - 1 !== index && <Divider />}
            </Fragment>
          );
        })}
      </List>
    </nav>
  );
};

export default MenuItems;
