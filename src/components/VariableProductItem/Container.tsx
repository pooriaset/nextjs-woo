import { Box, styled } from '@mui/material';
import { LinkProps } from 'next/link';

export const Container = styled(Box)<Partial<LinkProps>>(({ theme }) => ({
  display: 'block',
  height: '100%',
  border: '1px solid',
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}));
