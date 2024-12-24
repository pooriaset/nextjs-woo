import { Skeleton, Stack } from '@mui/material';

const CheckoutBoxSkeleton = () => {
  return (
    <>
      {new Array(4).fill(1).map((key) => {
        return (
          <Stack direction="row" key={key} justifyContent="space-between">
            <Skeleton height={30} width="40%" />
            <Skeleton height={30} width="40%" />
          </Stack>
        );
      })}
    </>
  );
};

export default CheckoutBoxSkeleton;
