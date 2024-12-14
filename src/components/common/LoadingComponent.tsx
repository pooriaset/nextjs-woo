'use client';

import { Box, CircularProgress } from '@mui/material';

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress color="inherit" size={24} />
    </Box>
  );
};

export default LoadingComponent;
