'use client';

import { Box } from '@mui/material';
import React from 'react';
import Lottie from 'react-lottie';

const CheckedAnimation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Lottie
        options={
          {
            loop: false,
            autoplay: true,
            path: '/assets/json/checked.json',
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          } as any
        }
        height={150}
        width={150}
        isStopped={false}
        isPaused={false}
      />
    </Box>
  );
};

export default CheckedAnimation;
