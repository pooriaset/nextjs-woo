'use client';

import { GET_POSTS } from '@/graphql/queries/blog';
import { getFragmentData } from '@/graphql/types';
import {
  GetPostsQuery,
  GetPostsQueryVariables,
  PostItemFragmentDoc,
} from '@/graphql/types/graphql';
import { useSuspenseQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { FC } from 'react';
import PostItem from './PostItem';

export interface PostsProps {
  categoryIn?: string[];
}

const Posts: FC<PostsProps> = ({ categoryIn = null }) => {
  const variables: GetPostsQueryVariables = {
    first: 10,
    after: null,
    before: null,
    categoryIn,
    last: null,
    title: null,
  };

  const { data } = useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(
    GET_POSTS,
    {
      variables,
    },
  );

  return (
    <>
      {data.posts?.edges.map(({ node }) => {
        const fragment = getFragmentData(PostItemFragmentDoc, node);
        return (
          <Grid item lg={4} md={12} key={fragment.databaseId}>
            <PostItem fragment={fragment} />
          </Grid>
        );
      })}
    </>
  );
};

export default Posts;
