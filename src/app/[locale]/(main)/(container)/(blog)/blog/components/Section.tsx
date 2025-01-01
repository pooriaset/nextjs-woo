'use client';

import { Box, styled } from '@mui/material';

export const Section = styled(Box)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.spacing(1),
}));
