import Image from '@/components/common/Image';
import { PostItemFragment } from '@/graphql/types/graphql';
import { Link } from '@/navigation';
import { getRefinedMetaDescription } from '@/utils/text';
import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface PostItemProps {
  fragment: PostItemFragment;
}
const PostItem: FC<PostItemProps> = ({ fragment }) => {
  return (
    <Stack
      component={Link}
      href={`/blog/${fragment.databaseId}/${fragment.slug}`}
      spacing={1.5}
      color="text.primary"
      alignItems="flex-start"
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: (theme) => theme.palette.background.default,
        height: '100%',
      }}
    >
      <Box
        width="100%"
        height={200}
        sx={{
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
      <Stack p={2} spacing={1}>
        <Typography
          component="h3"
          variant="h6"
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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {getRefinedMetaDescription(fragment?.excerpt)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PostItem;
