import Image from '@/components/common/Image';
import { GET_POSTS } from '@/graphql/queries/blog';
import { GetPostsQuery, GetPostsQueryVariables } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { useSuspenseQuery } from '@apollo/client';
import { Box, Grid, Stack, Typography } from '@mui/material';

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
            <Stack
              component={Link}
              href={`/blog/${node.databaseId}/${node.slug}`}
              spacing={1.5}
              color="text.primary"
              alignItems="center"
            >
              <Box
                height={216}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  width={1920 / 3}
                  height={1080 / 3}
                  alt={node.slug!}
                  src={node?.featuredImage?.node.sourceUrl}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Typography
                component="h3"
                variant="body1"
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: '21',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {node?.title}
              </Typography>
            </Stack>
          </Grid>
        );
      })}
    </>
  );
};

export default Posts;
