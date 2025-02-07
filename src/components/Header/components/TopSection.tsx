'use client';

import Logo from '@/components/common/Logo';
import { SIGN_IN_PAGE_PATHNAME } from '@/config/routes';
import useSearchPageParams from '@/hooks/useSearchPageParams';
import useInputFiller from '@/hooks/useInputFiller';
import { Link as NextLink, usePathname } from '@/navigation';
import { cartAtom } from '@/store/atoms';
import { SearchOutlined, ShoppingBasketOutlined } from '@mui/icons-material';
import { Button, Link, Stack, TextField } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { alpha, styled } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { DOMAttributes, FC } from 'react';
import LoggedInButton from './LoggedInButton';
import { SearchPageParamsKeys } from '@/utils/params';
import { useSearchParams } from 'next/navigation';

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
  const isAuthenticated = session.status === 'authenticated';

  const { navigate } = useSearchPageParams();
  const handleSubmitSearch: DOMAttributes<HTMLFormElement>['onSubmit'] = (
    event,
  ) => {
    event.preventDefault();
    const q = event.currentTarget.q.value;
    navigate(SearchPageParamsKeys.Q, q);
  };

  const cart = useAtomValue(cartAtom);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = `${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  return (
    <>
      <Toolbar disableGutters>
        <Link
          href="/"
          sx={{
            display: 'flex',
            userSelect: 'none',
            minWidth: 176,
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
              href={`${SIGN_IN_PAGE_PATHNAME}?callbackUrl=${callbackUrl}`}
              variant="outlined"
              color="inherit"
              sx={{
                minWidth: 180,
              }}
            >
              <Stack direction="row" spacing={1}>
                <span>{t('header.auth.login')}</span>
                <span>|</span>
                <span>{t('header.auth.register')}</span>
              </Stack>
            </Button>
          ) : (
            <LoggedInButton session={session} />
          )}

          <IconButton
            component={NextLink}
            href="/cart"
            size="large"
            aria-label="show cart items count"
          >
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
        </Stack>
      </Toolbar>
    </>
  );
};

export default TopSection;
