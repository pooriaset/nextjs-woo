import { styled } from '@mui/material';

export const BadgeImage = styled('a')<{}>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.spacing(1),
  width: 110,
  height: 125,
}));

export default BadgeImage;
