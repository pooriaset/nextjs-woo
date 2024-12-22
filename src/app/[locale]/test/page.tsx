'use client';

import Image from '@/components/common/Image';
import { Link } from '@/navigation';
import { ChevronRight } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import React, { FC, ReactNode, useState } from 'react';

export interface IMenuCategoryItem {
  id: string;
  title: string;
}

export interface MenuCategoryItemProps {
  title: string;
  selected: boolean;
  onClick: VoidFunction;
}
const MenuCategoryItem: FC<MenuCategoryItemProps> = ({
  title,
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
      <Typography variant="body2">{title}</Typography>
    </Stack>
  );
};

export interface SubCategoryItemProps {
  id: string;
  title: string;
}
const SubCategoryItem: FC<SubCategoryItemProps> = ({ id, title }) => {
  return (
    <Stack
      spacing={1}
      width="30%"
      alignItems="center"
      component={Link}
      href="#"
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          bgcolor: (theme) => theme.palette.grey[200],
          borderRadius: 1.5,
        }}
      >
        <Image
          width={82}
          height={82}
          src="/assets/images/sample-category.webp"
          alt={title}
        />
      </Stack>
      <Typography color="text.primary" variant="subtitle2">
        {title}
      </Typography>
    </Stack>
  );
};

export interface SubCategoriesProps {
  parentId: string | null;
  title: string;
}

const SubCategories: FC<SubCategoriesProps> = ({ title, parentId }) => {
  if (!parentId) {
    return null;
  }

  const items = [
    {
      title: 'لباس زنانه',
    },
    {
      title: 'لباس مردانه',
    },
    {
      title: 'لباس بچگانه',
    },
    {
      title: 'لباس بچگانه',
    },
    {
      title: 'لباس بچگانه',
    },
  ];

  return (
    <Stack px={1.5}>
      <Stack component={Link} href="#" height={65} justifyContent="center">
        <Typography
          variant="body2"
          color="primary"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          مشاهده همه کالاهای {title}{' '}
          <ChevronRight
            fontSize="small"
            sx={{
              transform: (theme) =>
                theme.direction === 'rtl' ? 'rotate(180deg)' : null,
            }}
          />
        </Typography>
      </Stack>
      <Stack direction="row" flexGrow={1} px={1.5} flexWrap="wrap" gap={1}>
        {items.map((item) => {
          return <SubCategoryItem title={item.title} id={item.title} />;
        })}
      </Stack>
    </Stack>
  );
};

const page = () => {
  const categories: IMenuCategoryItem[] = [
    {
      id: '1',
      title: 'مد و پوشاک',
    },
    {
      id: '2',
      title: 'زیبایی و سلامت',
    },
    {
      id: '3',
      title: 'ساعت و طلا',
    },
    {
      id: '4',
      title: 'ورزش و سفر',
    },
    {
      id: '5',
      title: 'لوازم خانه',
    },
  ];

  const [selected, setSelected] = useState<{ id: string; title: string }>(
    categories[0],
  );

  return (
    <>
      <Stack
        sx={{
          py: 3,
        }}
      >
        Categories
      </Stack>

      <Stack
        overflow="auto"
        sx={{
          borderTop: '1px solid',
          borderColor: (theme) => theme.palette.divider,
        }}
        direction="row"
      >
        <Stack
          overflow="auto"
          sx={{
            minWidth: 110,
          }}
        >
          {categories.map((category) => {
            return (
              <MenuCategoryItem
                selected={category.id === selected.id}
                {...category}
                key={category.id}
                onClick={() => setSelected(category)}
              />
            );
          })}
        </Stack>
        <SubCategories title={selected.title} parentId={selected.id} />
      </Stack>
    </>
  );
};

export default page;
