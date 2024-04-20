import { Typography } from '@mui/material';
import { FC } from 'react';

export interface PriceUnitProps {
  title: string;
}
const PriceUnit: FC<PriceUnitProps> = ({ title }) => {
  return (
    <Typography
      sx={{
        fontSize: 10,
        fontWeight: 400,
        userSelect: 'none',
        paddingLeft: 0.5,
      }}
    >
      {title}
    </Typography>
  );
};

export default PriceUnit;
