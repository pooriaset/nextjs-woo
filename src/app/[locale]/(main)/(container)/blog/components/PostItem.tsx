import Image from '@/components/common/Image';
import { GetPostsQuery } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface PostItemProps {
  data: NonNullable<GetPostsQuery['posts']>['edges'][number]['node'];
}
const PostItem: FC<PostItemProps> = ({ data }) => {
  return (
    <Stack
      component={Link}
      href={`/blog/${data.databaseId}/${data.slug}`}
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
          alt={data.slug!}
          src={data?.featuredImage?.node?.sourceUrl}
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
        {data?.title}
      </Typography>
    </Stack>
  );
};

export default PostItem;
