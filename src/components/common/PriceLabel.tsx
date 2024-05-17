import { FC } from 'react';

import PriceUnit from './PriceUnit';
import { Box, Typography, TypographyProps } from '@mui/material';
import { extractNumbers, getMinOfRangePrice } from '@/utils/price';
import { useTranslations } from 'next-intl';

export interface PriceLabelProps {
  value?: string | null;
  TypographyProps?: Partial<TypographyProps>;
}

const PriceLabel: FC<PriceLabelProps> = ({
  value,
  TypographyProps = {
    sx: {
      fontWeight: 300,
    },
  },
}) => {
  const t = useTranslations();
  return (
    <Box display="flex" alignItems="center">
      <Typography {...TypographyProps}>
        {extractNumbers(getMinOfRangePrice(value))?.toLocaleString()}
      </Typography>
      <PriceUnit title={t('units.price')} />
    </Box>
  );
};

export default PriceLabel;
