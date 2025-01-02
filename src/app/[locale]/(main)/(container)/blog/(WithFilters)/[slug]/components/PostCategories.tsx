'use client';

import { GetPostQuery } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { Chip } from '@mui/material';
import { FC } from 'react';

export interface PostCategoriesProps {
  items: NonNullable<NonNullable<GetPostQuery['post']>['categories']>['edges'];
}
const PostCategories: FC<PostCategoriesProps> = ({ items }) => {
  return (
    <>
      {items?.map(({ node }) => {
        return (
          <Chip
            key={node.databaseId}
            size="small"
            component={Link}
            href={`/blog/categories/${node.slug}`}
            label={node.name}
            sx={{
              cursor: 'pointer',
            }}
          />
        );
      })}
    </>
  );
};

export default PostCategories;
