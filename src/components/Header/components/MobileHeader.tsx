'use client';

import ProductSearchDialog from '@/components/ProductSearchDialog/ProductSearchDialog';
import ProductSearchForm from '@/components/ProductSearchForm/ProductSearchForm';
import Logo from '@/components/common/Logo';
import { usePathname, useRouter } from '@/navigation';
import { ArrowBack, Search, Share } from '@mui/icons-material';
import { Box, BoxProps, IconButton, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';

export interface MobileHeaderProps extends BoxProps {
  title?: string;
}
const MobileHeader: FC<MobileHeaderProps> = ({ title, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  if (pathname === '/' || pathname === '/search') {
    return null;
  }

  const handleToggleDialog = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClickOnBack = () => {
    if (window?.history?.length > 1) {
      router.back();
      return;
    }

    router.replace('/');
  };

  const handleClickOnShare = () => {
    const value = window.location.href;
    navigator.clipboard.writeText(value);
    toast.success(t('messages.copied'));
  };

  return (
    <>
      <ProductSearchDialog open={open} onClose={handleToggleDialog}>
        <ProductSearchForm onClickOnBack={handleToggleDialog} />
      </ProductSearchDialog>

      <Box px={2} borderBottom="1px solid" borderColor="divider" {...props}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5} direction="row" py={1} alignItems="center">
            <IconButton size="small" onClick={handleClickOnBack}>
              <ArrowBack
                sx={{
                  transform: (theme) =>
                    theme.direction === 'rtl' ? 'rotate(180deg)' : undefined,
                }}
              />
            </IconButton>
          </Stack>
          <Logo height={24} />
          <Stack direction="row" alignItems="center">
            <IconButton onClick={handleToggleDialog}>
              <Search />
            </IconButton>
            <IconButton onClick={handleClickOnShare}>
              <Share />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default MobileHeader;
