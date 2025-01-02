'use client';

import { GetCategoriesQuery } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { Button } from '@mui/material';
import { FC } from 'react';

export interface CategoryItemProps {
  data: NonNullable<GetCategoriesQuery['categories']>['edges'][number]['node'];
}
const CategoryItem: FC<CategoryItemProps> = ({ data }) => {
  return (
    <Button
      color="inherit"
      variant="outlined"
      component={Link}
      href={`/blog/categories/${data.slug}`}
    >
      {data.name}
    </Button>
  );
};

export default CategoryItem;
