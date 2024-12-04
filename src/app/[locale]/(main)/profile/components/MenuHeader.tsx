import CustomSkeleton from '@/components/CustomSkeleton/CustomSkeleton';
import { Link } from '@/navigation';
import { BorderColorOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography, Divider, Box } from '@mui/material';
import React, { FC } from 'react';

export interface MenuHeaderProps {
  fullName: string;
  username: string;
  isLoading?: boolean;
}

const MenuHeader: FC<MenuHeaderProps> = ({ fullName, username, isLoading }) => {
  return (
    <Box p={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={0.25}>
          <CustomSkeleton isLoading={isLoading} height={20} width={40}>
            <Typography>{fullName}</Typography>
          </CustomSkeleton>
          <CustomSkeleton isLoading={isLoading} height={20} width={80}>
            <Typography variant="caption" color="text.secondary">
              {username}
            </Typography>
          </CustomSkeleton>
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
