'use client';

import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <Stack direction="row" alignItems="flex-start">
      <Stack overflow="auto">
        {new Array(4).fill(1).map((_item, index) => {
          return (
            <Skeleton
              key={index.toString()}
              variant="rectangular"
              width={115}
              height={65}
              sx={{
                borderRadius: 0,
                borderBottom: '1px solid ',
                borderColor: (theme) => theme.palette.divider,
              }}
            />
          );
        })}
      </Stack>
      <Stack
        px={1.5}
        gap={1}
        flexWrap="wrap"
        justifyContent="center"
        direction="row"
        flexGrow={1}
      >
        {new Array(6).fill(1).map((_item, index) => {
          return (
            <Stack spacing={0.5} width="30%" key={index.toString()}>
              <Skeleton variant="rectangular" height={100} />
              <Skeleton variant="text" width="100%" />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Loading;
