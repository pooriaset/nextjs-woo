import PriceLabel from '@/components/common/PriceLabel';
import { ShippingRate } from '@/graphql/types/graphql';
import { Radio, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import ShippingMethodItem from './ShippingMethodItem';

export interface AvailableShippingMethodsProps {
  rates: ShippingRate[];
}
const AvailableShippingMethods: FC<AvailableShippingMethodsProps> = ({
  rates,
}) => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <Stack spacing={0.5}>
      {rates.map((rate) => {
        const selected = rate.id === value;
        return (
          <ShippingMethodItem
            selected={selected}
            onClick={() => handleChange(rate.id)}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Radio checked={selected} size="small" />
              <Typography variant="body2">{rate.label}</Typography>
            </Stack>
            <PriceLabel value={rate.cost} />
          </ShippingMethodItem>
        );
      })}
    </Stack>
  );
};

export default AvailableShippingMethods;
