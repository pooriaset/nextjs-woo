import { Divider, List } from '@mui/material';
import { FC } from 'react';
import MenuItem from './MenuItem';

export interface IMenuItem {
  label: string;
  href?: string;
  icon: any;
  count?: number;
  onClick?: () => void;
  isLoading?: boolean;
}

export interface MenuItemsProps {
  items: IMenuItem[];
}

const MenuItems: FC<MenuItemsProps> = ({ items }) => {
  return (
    <nav aria-label="profile menu">
      <List disablePadding>
        <Divider />
        {items.map((item, index) => {
          return (
            <MenuItem
              key={item.label}
              item={item}
              hasDivider={items.length - 1 !== index}
            />
          );
        })}
      </List>
    </nav>
  );
};

export default MenuItems;
