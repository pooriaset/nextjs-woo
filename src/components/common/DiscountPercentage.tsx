'use client';
import { Chip } from '@mui/material';
import React, { FC } from 'react';

export interface DiscountPercentageProps {
  value?: number | null;
}

const DiscountPercentage: FC<DiscountPercentageProps> = ({ value }) => {
  if (!value) {
    return null;
  }
  return (
    <Chip
      size="small"
      color="error"
      label={`${Math.floor(value)}%`}
      sx={{
        fontWeight: 600,
        fontSize: (theme) => theme.typography.caption.fontSize,
      }}
    />
  );
};

export default DiscountPercentage;
