import { FC } from 'react';

import PriceUnit from './PriceUnit';
import { Box, Typography } from '@mui/material';
import { extractNumbers, getMinOfRangePrice } from '@/utils/price';

export interface PriceLabelProps {
  value?: string | null;
}

const PriceLabel: FC<PriceLabelProps> = ({ value }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography
        sx={{
          fontWeight: 500,
        }}
      >
        {extractNumbers(getMinOfRangePrice(value))?.toLocaleString()}
      </Typography>
      <PriceUnit />
    </Box>
  );
};

export default PriceLabel;
