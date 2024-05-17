import { extractNumbers } from '@/utils/price';
import { Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { FC } from 'react';

export interface OldPriceProps {
  value?: string | null;
  TypographyProps?: Partial<TypographyProps>;
}

const OldPrice: FC<OldPriceProps> = ({ value, TypographyProps }) => {
  const _typographyProps: TypographyProps = {
    variant: 'caption',
    ...TypographyProps,
    sx: {
      textDecoration: 'line-through',
      color: grey[500],
      ...TypographyProps?.sx,
    },
  };

  return (
    <Typography {..._typographyProps}>
      {extractNumbers(value)?.toLocaleString()}
    </Typography>
  );
};

export default OldPrice;
