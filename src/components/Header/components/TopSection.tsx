import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import useInputFiller from '@/hooks/useInputFiller';
import {
  AccountCircleOutlined,
  SearchOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';
import { Divider, Link, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { alpha, styled } from '@mui/material/styles';
import Image from 'next/image';
import NextLink from 'next/link';
import { DOMAttributes, FC, useState } from 'react';

const Form = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
}));

const TopSection: FC = () => {
  const { inputRef } = useInputFiller();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { navigate } = useCustomSearchParams();
  const handleSubmitSearch: DOMAttributes<HTMLFormElement>['onSubmit'] = (
    event,
  ) => {
    event.preventDefault();
    const q = event.currentTarget.q.value;
    navigate('Q', q);
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>پروفایل</MenuItem>
      <MenuItem onClick={handleMenuClose}>حساب من</MenuItem>
    </Menu>
  );

  return (
    <>
      <Toolbar disableGutters>
        <Link
          component={NextLink}
          href="/"
          sx={{
            display: 'flex',
            userSelect: 'none',
          }}
        >
          <Image
            draggable={false}
            src="/assets/images/logo.svg"
            alt="Logo"
            width={176}
            height={26}
          />
        </Link>
        <Form onSubmit={handleSubmitSearch}>
          <TextField
            autoComplete="off"
            size="small"
            inputRef={inputRef}
            name="q"
            fullWidth
            placeholder="جستجو..."
            inputProps={{ 'aria-label': 'search' }}
            InputProps={{
              startAdornment: (
                <IconButton disableRipple type="submit">
                  <SearchOutlined />
                </IconButton>
              ),
              sx: {
                pl: 0.5,
              },
            }}
          />
        </Form>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <NextLink href="/cart">
            <IconButton size="large" aria-label="show 3 cart items">
              <Badge
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                badgeContent={3}
                color="error"
              >
                <ShoppingBasketOutlined />
              </Badge>
            </IconButton>
          </NextLink>
          <Divider orientation="vertical" variant="middle" flexItem />
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircleOutlined />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMenu}
    </>
  );
};

export default TopSection;
