import { Link } from '@/navigation';
import { BorderColorOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography, Divider, Box } from '@mui/material';
import React, { FC } from 'react';

export interface MenuHeaderProps {
  fullName: string;
  username: string;
}

const MenuHeader: FC<MenuHeaderProps> = ({ fullName, username }) => {
  return (
    <Box p={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack>
          <Typography>{fullName}</Typography>
          <Typography variant="caption" color="text.secondary">
            {username}
          </Typography>
        </Stack>
        <IconButton
          component={Link}
          href="/profile/information"
          size="small"
          color="primary"
        >
          <BorderColorOutlined fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default MenuHeader;
