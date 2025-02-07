import { CartContentFragment } from '@/graphql/types/graphql';
import { Divider, Stack } from '@mui/material';
import { FC } from 'react';
import useCheckoutItems from '../hooks/useCheckoutItems';

export interface CheckoutBoxProps {
  content: CartContentFragment;
}

const CheckoutBox: FC<CheckoutBoxProps> = ({ content }) => {
  const items = useCheckoutItems({ content });

  return (
    <Stack spacing={1}>
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return <Divider key={index} />;
        }
        return (
          <Stack
            key={index}
            justifyContent="space-between"
            direction="row"
            alignItems="center"
          >
            {item.key}
            {item.value}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default CheckoutBox;
