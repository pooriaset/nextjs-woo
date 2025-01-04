'use client';
import {
  Divider,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface ColumnSectionProps extends StackProps {
  children?: ReactNode;
  title: string;
  typographyProps?: Partial<TypographyProps>;
}

const ColumnSection: FC<ColumnSectionProps> = ({
  children,
  title,
  typographyProps,
  ...props
}) => {
  return (
    <Stack {...props}>
      <Divider>
        <Typography {...typographyProps}>{title}</Typography>
      </Divider>
      {children}
    </Stack>
  );
};

export default ColumnSection;
