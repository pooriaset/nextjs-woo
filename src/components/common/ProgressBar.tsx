'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          return prevProgress;
        }

        prevProgress += 13;
        return prevProgress;
      });
    }, 600);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};
export default ProgressBar;
