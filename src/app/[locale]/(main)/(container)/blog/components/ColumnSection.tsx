'use client';
import { Divider, Stack, StackProps, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface ColumnSectionProps extends StackProps {
  children?: ReactNode;
  title: string;
}

const ColumnSection: FC<ColumnSectionProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <Stack {...props}>
      <Divider>
        <Typography>{title}</Typography>
      </Divider>
      {children}
    </Stack>
  );
};

export default ColumnSection;
