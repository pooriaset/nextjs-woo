'use client';

import { Stack } from '@mui/material';
import { FC, useState } from 'react';
import SubCategories from './SubCategories';
import { GetAllCategoriesQuery } from '@/graphql/types/graphql';
import MenuCategoryItem from './MenuCategoryItem';

const Content: FC<{
  categories: NonNullable<GetAllCategoriesQuery['productCategories']>['nodes'];
}> = ({ categories = [] }) => {
  const [selected, setSelected] = useState<any>(categories[0]);

  return (
    <Stack overflow="auto" direction="row">
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
  );
};

export default Content;
