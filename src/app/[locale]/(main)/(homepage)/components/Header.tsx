'use client';

import useSearchPageParams from '@/hooks/useSearchPageParams';
import { SearchOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import SearchDialog from './SearchDialog';
import SearchSection from './SearchSection';
import { SearchPageParamsKeys } from '@/utils/params';

const Header = () => {
  const [isPending, startTransition] = useTransition();

  const { navigate, q } = useSearchPageParams();

  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen((prevState) => !prevState);
  };

  const onClickOnSearch = (q: string) => {
    startTransition(() => {
      navigate(SearchPageParamsKeys.Q, q);
      setOpen(false);
    });
  };

  const t = useTranslations();

  return (
    <>
      <SearchDialog open={open} onClose={handleToggleDialog}>
        <SearchSection
          onClickOnBack={handleToggleDialog}
          onClickOnSearch={onClickOnSearch}
          isPending={isPending}
        />
      </SearchDialog>
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
            {q ? q : t('header.search.placeholder')}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Header;
