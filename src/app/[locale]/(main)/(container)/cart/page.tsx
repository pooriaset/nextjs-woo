'use client';

import useCartQuery from '@/hooks/useCartQuery';
import useEmptyCart from '@/hooks/useEmptyCart';
import { Link as NextLink } from '@/navigation';
import { cartAtom } from '@/store/atoms';
import { DeleteOutline, MoreVert } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useConfirm } from 'material-ui-confirm';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const Page = () => {
  const t = useTranslations();
  const { loading } = useCartQuery();

  const cart = useAtomValue(cartAtom);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { emptyCartLoading, emptyCartMutate } = useEmptyCart();

  const confirm = useConfirm();
  const handleClickOnRemoveAll = () => {
    confirm({
      title: t('pages.cart.confirm.removeAllTitle'),
      description: t('pages.cart.confirm.removeAllDescription'),
      confirmationText: t('buttons.removeAll'),
    }).then(async () => {
      await emptyCartMutate();
    });
  };

  if (loading) {
    return <Skeleton />;
  }
  if (!cart?.productsCount) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mt: 5,
          gap: 2,
        }}
      >
        <Box
          sx={{
            opacity: 0.7,
            filter: 'grayscale(100%)',
          }}
        >
          <Image
            src="/assets/images/cart/unsuccess.svg"
            alt="NotFound"
            width={105}
            height={105}
          />
        </Box>
        <Typography variant="h6">{t('messages.cart.isEmpty')}</Typography>
        <NextLink href="/search">
          <Button variant="outlined">{t('buttons.products')}</Button>
        </NextLink>
      </Box>
    );
  }

  return (
    <>
      <Grid container>
        <Grid item lg={9} md={6} xs={12}>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClickOnRemoveAll}>
              <ListItemIcon>
                <DeleteOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText>حذف همه</ListItemText>
            </MenuItem>
          </Menu>
          <Card variant="outlined">
            <CardHeader
              action={
                <IconButton onClick={handleClick} aria-label="more options">
                  <MoreVert />
                </IconButton>
              }
              title="سبد خرید شما"
              subheader={`${cart.productsCount} کالا`}
            />
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={6} xs={12}></Grid>
      </Grid>
    </>
  );
};

export default Page;
