'use client';

import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface MenuCategoryItemProps {
  name: string | null;
  selected: boolean;
  onClick: VoidFunction;
}
const MenuCategoryItem: FC<MenuCategoryItemProps> = ({
  name,
  selected,
  onClick,
}) => {
  return (
    <Stack
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 65,
        backgroundColor: (theme) =>
          selected ? theme.palette.background.default : theme.palette.grey[200],
      }}
    >
      <Typography variant="body2">{name}</Typography>
    </Stack>
  );
};

export default MenuCategoryItem;
