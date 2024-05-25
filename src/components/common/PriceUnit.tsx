import { Typography, TypographyProps } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface PriceUnitProps {
  title: ReactNode;
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
