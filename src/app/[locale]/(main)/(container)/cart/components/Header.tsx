import useEmptyCart from '@/hooks/useEmptyCart';
import { cartAtom } from '@/store/atoms';
import { DeleteOutline, MoreVert } from '@mui/icons-material';
import {
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useConfirm } from 'material-ui-confirm';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const Header = () => {
  const t = useTranslations();
  const cart = useAtomValue(cartAtom);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
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
      <CardHeader
        action={
          <IconButton onClick={handleClick} aria-label="more options">
            <MoreVert />
          </IconButton>
        }
        title="سبد خرید شما"
        subheader={`${cart?.productsCount} کالا`}
      />
    </>
  );
};

export default Header;
