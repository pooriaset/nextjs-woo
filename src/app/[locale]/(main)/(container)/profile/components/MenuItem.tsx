import { Link } from '@/navigation';
import {
  Chip,
  CircularProgress,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { IMenuItem } from './MenuItems';

export interface MenuItemProps {
  item: IMenuItem;
  hasDivider?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ item, hasDivider }) => {
  const pathname = usePathname();

  return (
    <>
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
      {hasDivider && <Divider />}
    </>
  );
};

export default MenuItem;
