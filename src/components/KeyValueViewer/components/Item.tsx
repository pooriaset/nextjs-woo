import { Check, Close } from '@mui/icons-material';
import {
  Box,
  ListItem,
  ListItemProps,
  ListItemText,
  Typography,
  darken,
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

  const isOdd = index % 2 === 1;

  return (
    <ListItem
      sx={{
        ...(isOdd
          ? {
              bgcolor: (theme) =>
                darken(theme.palette.background.default, 0.02),
              borderRadius: 1,
            }
          : {}),
      }}
      {...props}
    >
      <ListItemText
        primary={
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '256px 1fr',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {item.key}
            </Typography>

            {_position === 'top' && action}
          </Box>
        }
        secondary={_position === 'bottom' && <Box sx={{ mt: 1 }}>{action}</Box>}
      />
    </ListItem>
  );
};

export default Item;
