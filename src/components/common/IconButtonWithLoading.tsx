import { CircularProgress, IconButton, IconButtonProps } from '@mui/material';
import { FC } from 'react';

export interface IconButtonWithLoadingProps extends IconButtonProps {
  isLoading?: boolean;
}
const IconButtonWithLoading: FC<IconButtonWithLoadingProps> = ({
  isLoading,
  ...props
}) => {
  return (
    <IconButton {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        props.children
      )}
    </IconButton>
  );
};

export default IconButtonWithLoading;
