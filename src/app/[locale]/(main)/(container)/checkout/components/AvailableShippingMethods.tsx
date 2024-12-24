import PriceLabel from '@/components/common/PriceLabel';
import { ShippingRate } from '@/graphql/types/graphql';
import { Radio, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import ShippingMethodItem from './ShippingMethodItem';

export interface AvailableShippingMethodsProps {
  rates: ShippingRate[];
  defaultValue?: string | null;
  isFree?: boolean;
  onChange?: Function;
}
const AvailableShippingMethods: FC<AvailableShippingMethodsProps> = ({
  rates,
  defaultValue,
  isFree,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = async (newValue: string) => {
    try {
      setValue(newValue);
      onChange?.(newValue);
    } catch (error) {
      setValue(defaultValue);
    }
  };

  return (
    <Stack spacing={0.5}>
      {rates?.map((rate) => {
        if (!rate) {
          return null;
        }
        const selected = rate.id === value;
        return (
          <ShippingMethodItem
            key={rate.id}
            selected={selected}
            onClick={() => handleChange(rate.id)}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Radio disableRipple checked={selected} size="small" />

              <Typography variant="body2">{rate.label}</Typography>
            </Stack>

            {!!rate.cost && !isFree && <PriceLabel value={rate.cost} />}
            {isFree && (
              <Typography color="primary" fontWeight={600}>
                رایگان
              </Typography>
            )}
          </ShippingMethodItem>
        );
      })}
    </Stack>
  );
};

export default AvailableShippingMethods;
