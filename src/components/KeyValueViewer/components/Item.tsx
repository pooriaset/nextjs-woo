import { Check, Close } from '@mui/icons-material';
import {
  Box,
  ListItem,
  ListItemProps,
  ListItemText,
  Typography,
  lighten,
} from '@mui/material';
import { FC } from 'react';
import { IKeyValueItem } from '../types';

export type ItemProps = ListItemProps & {
  index: number;
  item: IKeyValueItem;
};
const Item: FC<ItemProps> = ({ item, index, ...props }) => {
  const isBoolean = typeof item.value === 'boolean';
  const isNumber = typeof item.value === 'number';

  const action = isBoolean ? (
    item.value ? (
      <Check color="success" />
    ) : (
      <Close color="error" />
    )
  ) : isNumber ? (
    <Typography>{item.value?.toLocaleString()}</Typography>
  ) : (
    <Typography dir="auto">{item.value ?? 'N/A'}</Typography>
  );

  const _position = item.position || item.value?.length > 46 ? 'bottom' : 'top';

  return (
    <>
      <ListItem
        sx={{
          bgcolor: (theme) =>
            index % 2 === 1 ? lighten(theme.palette.primary.light, 0.95) : null,
        }}
        secondaryAction={_position === 'top' && action}
        {...props}
      >
        <ListItemText
          primary={
            <Typography
              sx={{
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {item.key}
            </Typography>
          }
          secondary={
            _position === 'bottom' && <Box sx={{ mt: 1 }}>{action}</Box>
          }
        />
      </ListItem>
    </>
  );
};

export default Item;
