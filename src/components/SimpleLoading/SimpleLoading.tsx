import { CircularProgress, Stack } from '@mui/material';
import React from 'react';

const SimpleLoading = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100%"
      flexGrow={1}
    >
      <CircularProgress size={24} />
    </Stack>
  );
};

export default SimpleLoading;
