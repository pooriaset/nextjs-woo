import { Divider, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface CardHeaderProps {
  title: string;
  children?: ReactNode;
}
const CardHeader: FC<CardHeaderProps> = ({ title, children }) => {
  return (
    <Stack spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">{title}</Typography>
        {children}
      </Stack>
      <Divider />
    </Stack>
  );
};

export default CardHeader;
