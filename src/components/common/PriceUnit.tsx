import { Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

export interface PriceUnitProps {
  title: string;
  TypographyProps?: Partial<TypographyProps>;
}
const PriceUnit: FC<PriceUnitProps> = ({ title, TypographyProps }) => {
  return (
    <Typography
      {...TypographyProps}
      sx={{
        ...TypographyProps?.sx,
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
