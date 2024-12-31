import { Box, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface IAttribute {
  title: string;
  value: ReactNode | undefined;
  icon: ReactNode;
  name?: string | undefined | null;
}

export interface AttributesProps {
  items: IAttribute[];
}
const Attributes: FC<AttributesProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => {
        return (
          <Stack key={item.title} spacing={0.5} direction="row">
            <Box minWidth={20}>{item.icon}</Box>
            <Typography variant="subtitle2">{item.title}</Typography>
            <Typography variant="subtitle2">{item.value}</Typography>
          </Stack>
        );
      })}
    </>
  );
};

export default Attributes;
