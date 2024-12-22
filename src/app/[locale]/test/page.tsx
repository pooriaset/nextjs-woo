'use client';

import { Box, Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface IMenuCategoryItem {
  id: string;
  icon: ReactNode;
  title: string;
}

const MenuCategoryItem: FC<IMenuCategoryItem> = ({ title }) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 110,
        height: 65,
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      {title}
    </Stack>
  );
};

const page = () => {
  const categories: IMenuCategoryItem[] = [
    {
      id: '1',
      icon: '',
      title: 'مد و پوشاک',
    },
    {
      id: '2',
      icon: '',
      title: 'زیبایی و سلامت',
    },
    {
      id: '3',
      icon: '',
      title: 'ساعت و طلا',
    },
  ];

  return (
    <Stack overflow="auto">
      {categories.map((category) => {
        return <MenuCategoryItem {...category} key={category.id} />;
      })}
    </Stack>
  );
};

export default page;
