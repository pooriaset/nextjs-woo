'use client';

import ProductSearchForm from '@/components/ProductSearchForm/ProductSearchForm';
import useSearchPageParams from '@/hooks/useSearchPageParams';
import { SearchOutlined } from '@mui/icons-material';
import { Box, Container, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ProductSearchDialog from '@/components/ProductSearchDialog/ProductSearchDialog';

const MobileHeader = () => {
  const [open, setOpen] = useState(false);
  const handleToggleDialog = () => {
    setOpen((prevState) => !prevState);
  };

  const { q } = useSearchPageParams();

  const t = useTranslations();

  return (
    <Container
      maxWidth="xl"
      sx={{ borderBottom: '2px solid', borderColor: 'divider' }}
    >
      <ProductSearchDialog open={open} onClose={handleToggleDialog}>
        <ProductSearchForm onClickOnBack={handleToggleDialog} />
      </ProductSearchDialog>
      <Stack direction="row" spacing={1} alignItems="center" height={56}>
        <Box
          onClick={handleToggleDialog}
          sx={{
            my: 1,
            backgroundColor: grey[200],
            width: '100%',
            borderRadius: (theme) => theme.shape.borderRadius / 8,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            height: '80%',
          }}
        >
          <SearchOutlined
            htmlColor={grey[500]}
            sx={{
              height: 24,
              ml: 2,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: grey[500],
              pl: 1,
            }}
          >
            {q || t('header.search.placeholder')}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default MobileHeader;
