'use client';

import { GET_POSTS } from '@/graphql/queries/blog';
import { GetPostsQuery, GetPostsQueryVariables } from '@/graphql/types/graphql';
import { useSuspenseQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import PostItem from './PostItem';

const Posts = () => {
  const variables: GetPostsQueryVariables = {
    first: 10,
    after: null,
    before: null,
    categoryIn: null,
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
        return (
          <Grid item lg={4} md={12} key={node.databaseId}>
            <PostItem data={node!} />
          </Grid>
        );
      })}
    </>
  );
};

export default Posts;
