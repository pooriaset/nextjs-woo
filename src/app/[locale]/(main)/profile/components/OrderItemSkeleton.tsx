import DotIcon from '@/components/Icons/components/Use/DotIcon';
import { Skeleton, Stack, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FC } from 'react';
import OrderItemImage from './OrderItemImage';

const OrderItemSkeleton: FC = () => {
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="end"
          >
            <Stack alignItems="end" direction="row" spacing={0.5}>
              <Skeleton variant="circular" width={24} />
              <Skeleton variant="text" width={150} />
            </Stack>

            <Skeleton variant="circular" width={24} />
          </Stack>
          <Stack spacing={1} direction="row" alignItems="center">
            <Skeleton variant="text" width={50} />
            <Skeleton variant="text" width={50} />
            <DotIcon color={theme.palette.divider} />
            <Skeleton variant="text" width={50} />
            <Skeleton variant="text" width={50} />
            <DotIcon color={theme.palette.divider} />
            <Skeleton variant="text" width={50} />
            <Skeleton variant="text" width={50} />
          </Stack>
          <Stack direction="row" spacing={1}>
            {new Array(3).fill(1).map((image) => {
              return (
                <Skeleton
                  key={image}
                  variant="rectangular"
                  width={64}
                  height={64}
                />
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderItemSkeleton;
