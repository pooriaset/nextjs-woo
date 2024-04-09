import { ListItemButton, styled } from '@mui/material';

export const ListItem = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'transparent',
  },
  py: 1,
}));
