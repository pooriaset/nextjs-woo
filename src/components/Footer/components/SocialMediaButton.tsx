import { IconButton, styled } from '@mui/material';

export const SocialMediaButton = styled(IconButton)<{}>(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  width: 36,
  height: 36,
}));

export default SocialMediaButton;
