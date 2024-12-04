import { Skeleton, SkeletonProps } from '@mui/material';
import { FC } from 'react';

export interface CustomSkeletonProps extends SkeletonProps {
  isLoading?: boolean;
}
const CustomSkeleton: FC<CustomSkeletonProps> = ({ isLoading, ...props }) => {
  if (!isLoading) {
    return props.children;
  }
  return <Skeleton variant="rectangular" width="100%" {...props} />;
};

export default CustomSkeleton;
