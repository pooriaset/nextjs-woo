import { BorderColorOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography, Divider, Box } from '@mui/material';
import React from 'react';

const MenuHeader = () => {
  return (
    <Box p={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography>نام کاربر</Typography>
          <Typography variant="caption" color="text.secondary">
            09560005522
          </Typography>
        </Stack>
        <IconButton size="small" color="primary">
          <BorderColorOutlined fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default MenuHeader;
