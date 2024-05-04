'use client';
import { Box } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

const SortWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
        borderBottom: '1px solid',
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      {children}
    </Box>
  );
};

export default SortWrapper;
