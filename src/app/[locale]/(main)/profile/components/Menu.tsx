import { Box, Card, CardContent, Divider } from '@mui/material';
import MenuHeader from './MenuHeader';
import MenuItems from './MenuItems';

const Menu = () => {
  return (
    <Box
      sx={{
        width: 260,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <MenuHeader />

      <MenuItems />
    </Box>
  );
};

export default Menu;
