import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <Stack direction="row" alignItems="flex-start">
      <Skeleton width={115} height="100%" />
      <Stack px={1.5} gap={1} flexWrap="wrap" direction="row" flexGrow={1}>
        {new Array(6).fill(1).map((item) => {
          return <Skeleton width="30%" height={100} />;
        })}
      </Stack>
    </Stack>
  );
};

export default Loading;
