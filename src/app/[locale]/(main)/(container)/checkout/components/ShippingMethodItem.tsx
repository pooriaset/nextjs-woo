import { Stack, lighten, styled } from '@mui/material';

export const ShippingMethodItem = styled(Stack)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1, 2),
    cursor: 'pointer',
    ...(selected
      ? {
          backgroundColor: lighten(theme.palette.primary.light, 0.5),
        }
      : {
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
          },
        }),
  }),
);

export default ShippingMethodItem;
