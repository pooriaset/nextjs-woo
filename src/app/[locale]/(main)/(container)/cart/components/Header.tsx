import Dialog, { DialogProps } from '@/components/Dialog/Dialog';
import useNewDialog from '@/components/Dialog/hooks/useNewDialog';
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

  const { open, handleCloseDialog, handleOpenDialog, returnButton } =
    useNewDialog();

  const handleClickOnConfirm = async () => {
    await emptyCartMutate();
  };

  const onCloseDialog: DialogProps['onClose'] = (event, reason) => {
    if (!emptyCartLoading) {
      handleCloseDialog();
    }
  };

  return (
    <>
      <Dialog
        title={t('pages.cart.confirm.removeAllTitle')}
        open={open}
        closeButtonDisabled={emptyCartLoading}
        onClose={onCloseDialog}
        PaperProps={{
          sx: {
            width: 500,
          },
        }}
        dialogContentProps={{
          dividers: true,
        }}
        buttons={[
          returnButton,
          {
            children: t('buttons.removeAll'),
            onClick: handleClickOnConfirm,
            isLoading: emptyCartLoading,
            variant: 'contained',
            color: 'primary',
            fullWidth: true,
            size: 'large',
          },
        ]}
      >
        {t('pages.cart.confirm.removeAllDescription')}
      </Dialog>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenDialog}>
          <ListItemIcon>
            <DeleteOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('buttons.removeAll')}</ListItemText>
        </MenuItem>
      </Menu>
      <CardHeader
        action={
          <IconButton onClick={handleClick} aria-label="more options">
            <MoreVert />
          </IconButton>
        }
        title={t('pages.cart.title')}
        subheader={`${cart?.contents?.itemCount} ${t('products.count')}`}
      />
    </>
  );
};

export default Header;
