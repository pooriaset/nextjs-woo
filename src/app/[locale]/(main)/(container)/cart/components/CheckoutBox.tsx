import { Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface CheckoutBoxProps {
  items: { key: ReactNode; value: ReactNode }[];
}

const CheckoutBox: FC<CheckoutBoxProps> = ({ items }) => {
  return (
    <Stack spacing={1}>
      {items.map((item, index) => {
        return (
          <Stack
            key={index}
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            {item.key}
            {item.value}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default CheckoutBox;
