import PriceLabel from '@/components/common/PriceLabel';
import { UPDATE_SHIPPING_METHOD } from '@/graphql/queries/cart';
import {
  ShippingRate,
  UpdateShippingMethodMutation,
} from '@/graphql/types/graphql';
import { useMutation } from '@apollo/client';
import { Radio, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import ShippingMethodItem from './ShippingMethodItem';

export interface AvailableShippingMethodsProps {
  rates: ShippingRate[];
  value?: string | null;
}
const AvailableShippingMethods: FC<AvailableShippingMethodsProps> = ({
  rates,
  value,
}) => {
  const [update, { loading }] = useMutation<UpdateShippingMethodMutation>(
    UPDATE_SHIPPING_METHOD,
  );

  const handleChange = (value: string) => {
    update({
      variables: {
        shippingMethods: [value],
      },
    });
  };

  return (
    <Stack spacing={0.5}>
      {rates?.map((rate) => {
        const selected = rate.id === value;
        return (
          <ShippingMethodItem
            selected={selected}
            onClick={() => handleChange(rate.id)}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Radio disableRipple checked={selected} size="small" />
              <Typography variant="body2">{rate.label}</Typography>
            </Stack>
            {!!rate.cost && <PriceLabel value={rate.cost} />}
          </ShippingMethodItem>
        );
      })}
    </Stack>
  );
};

export default AvailableShippingMethods;
