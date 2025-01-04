import { Grid } from '@mui/material';
import React from 'react';
import PostItemSkeleton from './PostItemSkeleton';

const PostsSkeleton = () => {
  return (
    <>
      {new Array(3).fill(1).map((_, index) => {
        return (
          <Grid item lg={4} md={12} xs={12} key={index.toString()}>
            <PostItemSkeleton />
          </Grid>
        );
      })}
    </>
  );
};

export default PostsSkeleton;
