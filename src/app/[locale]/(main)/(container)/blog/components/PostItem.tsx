import Image from '@/components/common/Image';
import { PostItemFragment } from '@/graphql/types/graphql';
import { useAppContext } from '@/hooks/useAppContext';
import { Link } from '@/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface PostItemProps {
  fragment: PostItemFragment;
}
const PostItem: FC<PostItemProps> = ({ fragment }) => {
  const { isMobile } = useAppContext();

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
      }}
    >
      <Box
        width="100%"
        height={isMobile ? 113 : 216}
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
      <Typography
        component="h3"
        variant="body1"
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: '21',
          WebkitBoxOrient: 'vertical',
          p: 2,
        }}
      >
        {fragment?.title}
      </Typography>
    </Stack>
  );
};

export default PostItem;
