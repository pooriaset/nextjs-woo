import { Card, CardContent } from '@mui/material';
import React, { FC, ReactNode } from 'react';

export interface FiltersCardProps {
  children: ReactNode;
}
const FiltersCard: FC<FiltersCardProps> = ({ children }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: 'sticky',
        top: 130,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FiltersCard;
