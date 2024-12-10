'use client';

import MenuItems from '@/app/[locale]/(main)/profile/components/MenuItems';
import useMenuItems from '@/app/[locale]/(main)/profile/hooks/useMenuItems';
import { Link } from '@/navigation';
import { ChevronRight, PersonOutline } from '@mui/icons-material';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { SessionContextValue } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';

export interface LoggedInButton {
  session: SessionContextValue;
}

const LoggedInButton: FC<LoggedInButton> = ({ session }) => {
  const menuId = 'primary-search-account-menu';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const { items } = useMenuItems();

  const t = useTranslations();

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        keepMounted
        open={isMenuOpen}
        onClose={onClose}
        disableScrollLock
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
            },
          },
        }}
      >
        <MenuItem
          component={Link}
          href="/profile"
          onClick={() => {
            onClose();
          }}
          sx={{
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            {session.data?.user?.name}
          </Typography>
          <ChevronRight
            sx={{
              transform: (theme) =>
                theme.direction === 'rtl' ? 'rotate(180deg)' : undefined,
            }}
          />
        </MenuItem>

        <MenuItems items={items} />
      </Menu>

      <Button
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        variant="outlined"
        color="inherit"
        sx={{
          minWidth: 150,
        }}
        startIcon={<PersonOutline />}
      >
        {t('header.auth.userAccount')}
      </Button>
    </>
  );
};

export default LoggedInButton;
