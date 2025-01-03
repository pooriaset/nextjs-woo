'use client';

import { Link } from '@/navigation';
import { ChevronRight } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import SubCategoryItem from './SubCategoryItem';

export interface SubCategoriesProps {
  parentId: string | null;
  name: string;
  items: any[];
}

const SubCategories: FC<SubCategoriesProps> = ({ name, parentId, items }) => {
  if (!parentId) {
    return null;
  }

  const params = new URLSearchParams();
  params.set('categoryId', parentId!.toString());
  const parentLink = `/search?${params.toString()}`;

  return (
    <Stack px={1.5} flexGrow={1}>
      <Stack
        component={Link}
        href={parentLink}
        height={65}
        justifyContent="center"
      >
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
      <Stack direction="row" px={1.5} flexWrap="wrap" gap={1}>
        {items.map((item) => {
          return (
            <SubCategoryItem
              key={item.id}
              src={item.image?.sourceUrl}
              name={item.name}
              id={item.id}
            />
          );
        })}

        <SubCategoryItem
          src={'/assets/images/all-product.webp'}
          name={'همه کالاها'}
          id={parentId}
        />
      </Stack>
    </Stack>
  );
};

export default SubCategories;
