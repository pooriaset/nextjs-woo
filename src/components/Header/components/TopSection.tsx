import { SIGN_IN_PAGE_PATHNAME } from '@/config/routes';
import Logo from '@/components/common/Logo';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import useInputFiller from '@/hooks/useInputFiller';
import { Link as NextLink, usePathname, useRouter } from '@/navigation';
import { cartAtom } from '@/store/atoms';
import {
  AccountCircleOutlined,
  SearchOutlined,
  ShoppingBasketOutlined,
} from '@mui/icons-material';
import { Button, Link, Stack, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { alpha, styled } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { DOMAttributes, FC, useState } from 'react';
import { protectedRoutes } from '@/config/app';

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
  const t = useTranslations();
  const { inputRef } = useInputFiller();

  const session = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
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

  const cart = useAtomValue(cartAtom);

  const menuId = 'primary-search-account-menu';
  const isAuthenticated = session.status === 'authenticated';

  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    if (protectedRoutes.some((route) => pathname.includes(route))) {
      router.push('/');
    }
  };

  const loggedInMenuItems = [
    {
      id: 'profile',
      label: t('header.user.profile'),
      href: '/profile',
    },
    {
      id: 'profile-information',
      label: t('header.user.myAccount'),
      href: '/profile/information',
    },
    {
      id: 'logout-button',
      label: t('header.user.logout'),
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Toolbar disableGutters>
        <Link
          href="/"
          sx={{
            display: 'flex',
            userSelect: 'none',
          }}
        >
          <Logo />
        </Link>
        <Form onSubmit={handleSubmitSearch}>
          <TextField
            autoComplete="off"
            size="small"
            inputRef={inputRef}
            name="q"
            fullWidth
            placeholder={t('header.search.placeholder')}
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

        <Stack spacing={1} direction="row" alignItems="center">
          {!isAuthenticated ? (
            <Button
              component={Link}
              href={SIGN_IN_PAGE_PATHNAME}
              variant="outlined"
              color="inherit"
              sx={{
                minWidth: 150,
              }}
            >
              <Stack direction="row" spacing={1}>
                <span>{t('header.auth.login')}</span>
                <span>|</span>
                <span>{t('header.auth.register')}</span>
              </Stack>
            </Button>
          ) : (
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
          )}

          <NextLink href="/cart">
            <IconButton size="large" aria-label="show cart items count">
              <Badge
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                badgeContent={cart?.contents?.itemCount}
                color="error"
              >
                <ShoppingBasketOutlined />
              </Badge>
            </IconButton>
          </NextLink>
        </Stack>
      </Toolbar>
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
        onClose={onClose}
      >
        {loggedInMenuItems.map((item) => {
          const linkProps = item.href
            ? {
                component: Link,
                href: item.href,
              }
            : {};

          return (
            <MenuItem
              {...linkProps}
              key={item.id}
              onClick={() => {
                item.onClick?.();
                onClose();
              }}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default TopSection;
