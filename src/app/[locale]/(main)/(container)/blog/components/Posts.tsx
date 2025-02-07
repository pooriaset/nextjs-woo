'use client';

import { GET_POSTS } from '@/graphql/queries/blog';
import { getFragmentData } from '@/graphql/types';
import {
  GetPostsQuery,
  GetPostsQueryVariables,
  PostItemFragmentDoc,
} from '@/graphql/types/graphql';
import useBlogPageParams from '@/hooks/useBlogPageParams';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import NotFoundItem from './NotFoundItem';
import PostItem from '@/components/PostItem/PostItem';
import PostItemSkeleton from '@/components/PostItem/PostItemSkeleton';

export interface PostsProps {
  categoryIn?: string[];
}

const Posts: FC<PostsProps> = ({ categoryIn = null }) => {
  const params = useBlogPageParams();

  const variables: Partial<GetPostsQueryVariables> = useMemo(() => {
    return {
      first: 12,
      categoryIn,
      search: params.search,
    };
  }, [categoryIn, params.search]);

  const initQuery = useSuspenseQuery<
    GetPostsQuery,
    Partial<GetPostsQueryVariables>
  >(GET_POSTS, {
    variables,
  });

  const paginateQuery = useQuery<
    GetPostsQuery,
    Partial<GetPostsQueryVariables>
  >(GET_POSTS, {
    variables,
    skip: true,
  });

  const items = [
    ...(initQuery.data?.posts?.edges || []),
    ...(paginateQuery.data?.posts?.edges || []),
  ];

  const { hasNextPage, endCursor } = {
    ...initQuery.data?.posts?.pageInfo,
    ...paginateQuery.data?.posts?.pageInfo,
  };

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    if (isIntersecting) {
      paginateQuery.fetchMore({
        variables: {
          ...variables,
          after: endCursor,
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          const newNodes = fetchMoreResult.posts?.edges || [];
          const pageInfo = fetchMoreResult.posts?.pageInfo!;

          return newNodes?.length!
            ? {
                ...previousQueryResult,

                posts: {
                  ...previousQueryResult.posts,

                  edges: [
                    ...(previousQueryResult.posts?.edges || []),
                    ...newNodes,
                  ],

                  pageInfo,
                },
              }
            : previousQueryResult;
        },
      });
    }
  }, [isIntersecting]);
  if (!items?.length) {
    return (
      <Grid item xs={12}>
        <NotFoundItem />
      </Grid>
    );
  }

  return (
    <>
      {items.map(({ node }) => {
        const fragment = getFragmentData(PostItemFragmentDoc, node);
        return (
          <Grid item lg={4} md={12} xs={12} key={fragment.databaseId}>
            <PostItem fragment={fragment} />
          </Grid>
        );
      })}

      {hasNextPage && (
        <>
          {new Array(3 - (items.length % 3)).fill(1).map((_, index) => {
            return (
              <Grid
                ref={index === 0 ? ref : null}
                key={index.toString()}
                item
                lg={4}
                md={12}
                xs={12}
              >
                <PostItemSkeleton />
              </Grid>
            );
          })}
        </>
      )}
    </>
  );
};

export default Posts;
