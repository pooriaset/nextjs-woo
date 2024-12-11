'use client';

import { usePathname, useRouter } from '@/navigation';
import { ArrowBack, Search, Share } from '@mui/icons-material';
import { Box, BoxProps, IconButton, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface MobileHeaderProps extends BoxProps {
  title?: string;
}
const MobileHeader: FC<MobileHeaderProps> = ({ title, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  const onClick = () => {
    if (window?.history?.length > 1) {
      router.back();
      return;
    }

    router.replace('/');
  };

  return (
    <Box px={2} borderBottom="1px solid" borderColor="divider" {...props}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5} direction="row" py={1} alignItems="center">
          <IconButton size="small" onClick={onClick}>
            <ArrowBack
              sx={{
                transform: (theme) =>
                  theme.direction === 'rtl' ? 'rotate(180deg)' : undefined,
              }}
            />
          </IconButton>
          {!!title && (
            <Typography variant="body1" fontWeight={600}>
              {title}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" alignItems="center">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MobileHeader;
