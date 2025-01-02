import Image from '@/components/common/Image';
import { PostItemFragment } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface PostItemProps {
  fragment: PostItemFragment;
}
const PostItem: FC<PostItemProps> = ({ fragment }) => {
  return (
    <Stack
      component={Link}
      href={`/blog/${fragment.slug}`}
      spacing={1.5}
      color="text.primary"
      alignItems="center"
    >
      <Box
        width="100%"
        height={216}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Image
          width={1920 / 3}
          height={1080 / 3}
          alt={fragment.slug!}
          src={fragment?.featuredImage?.node?.sourceUrl}
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
        {fragment?.title}
      </Typography>
    </Stack>
  );
};

export default PostItem;
