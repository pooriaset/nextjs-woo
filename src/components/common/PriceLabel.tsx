import { FC, ReactNode } from 'react';

import { extractNumbers, getMinOfRangePrice } from '@/utils/price';
import { Stack, Typography, TypographyProps } from '@mui/material';
import { useTranslations } from 'next-intl';
import PriceUnit from './PriceUnit';
import { ToomanIcon } from '../Icons';

export interface PriceLabelProps {
  value?: string | number | null;
  TypographyProps?: Partial<TypographyProps>;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const PriceLabel: FC<PriceLabelProps> = ({
  value,
  TypographyProps = {
    sx: {
      fontWeight: 300,
    },
  },
  suffix,
  prefix,
}) => {
  const t = useTranslations();

  const _value =
    typeof value === 'string'
      ? extractNumbers(getMinOfRangePrice(value))
      : value;

  return (
    <Stack alignItems="center" spacing={0.25} direction="row">
      {prefix}
      <Typography {...TypographyProps}>{_value?.toLocaleString()}</Typography>
      <PriceUnit title={<ToomanIcon />} TypographyProps={TypographyProps} />
      {suffix}
    </Stack>
  );
};

export default PriceLabel;
