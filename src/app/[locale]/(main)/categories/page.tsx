'use client';

import { GET_ALL_CATEGORIES_QUERY } from '@/graphql/queries/categories';
import { CategoriesQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import MenuCategoryItem from './components/MenuCategoryItem';
import SubCategories from './components/SubCategories';

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

export default page;
