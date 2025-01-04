import { Skeleton, Stack } from '@mui/material';
import { FC } from 'react';

const PostItemSkeleton: FC<{}> = () => {
  return (
    <Stack spacing={1.5} color="text.primary" alignItems="center">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={216}
        sx={{
          borderRadius: 2,
        }}
      />

      <Skeleton variant="text" width={100} />
    </Stack>
  );
};

export default PostItemSkeleton;
