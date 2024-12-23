'use client';

import Image from '@/components/common/Image';
import {
  GET_ALL_CATEGORIES_QUERY,
  GET_MAIN_CATEGORIES,
} from '@/graphql/queries/categories';
import {
  CategoriesQuery,
  GetMainCategoriesQuery,
} from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { NetworkStatus, useQuery } from '@apollo/client';
import { ChevronRight } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import React, { FC, ReactNode, useEffect, useState } from 'react';

export interface IMenuCategoryItem {
  id: string;
  name: string;
}

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

export interface SubCategoryItemProps {
  id: string;
  name: string;
}
const SubCategoryItem: FC<SubCategoryItemProps> = ({ id, name }) => {
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
          alt={name}
        />
      </Stack>
      <Typography color="text.primary" variant="subtitle2">
        {name}
      </Typography>
    </Stack>
  );
};

export interface SubCategoriesProps {
  parentId: string | null;
  name: string;
  items: any[];
}

const SubCategories: FC<SubCategoriesProps> = ({ name, parentId, items }) => {
  if (!parentId) {
    return null;
  }

  return (
    <Stack px={1.5} flexGrow={1}>
      <Stack component={Link} href="#" height={65} justifyContent="center">
        <Typography
          variant="body2"
          color="primary"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          مشاهده همه کالاهای {name}{' '}
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
          return <SubCategoryItem name={item.name} id={item.name} />;
        })}
      </Stack>
    </Stack>
  );
};

const page = () => {
  const { data, loading } = useQuery<CategoriesQuery>(
    GET_ALL_CATEGORIES_QUERY,
    {
      variables: {
        first: 10000,
      },
    },
  );

  const categories = data?.productCategories?.nodes || [];

  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    if (!loading) {
      setSelected(categories[0]);
    }
  }, [loading]);

  if (loading || !selected) {
    return <>Loading</>;
  }

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
          {categories
            .filter((category) => !category.parentId)
            .map((category) => {
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
        <SubCategories
          name={selected.name}
          parentId={selected.id}
          items={categories.filter(
            (category) => category.parentId === selected.id,
          )}
        />
      </Stack>
    </>
  );
};

export default page;
