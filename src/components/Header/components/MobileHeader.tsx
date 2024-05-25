import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { Locale } from '@/navigation';
import { SearchOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import SearchDialog from './SearchDialog';
import SearchSection from './SearchSection';

const MobileHeader = () => {
  const { navigate, q } = useCustomSearchParams();

  const [open, setOpen] = useState(false);

  const handleToggleDialog = () => {
    setOpen((prevState) => !prevState);
  };

  const onClickOnSearch = (q: string) => {
    navigate('Q', q);
    setOpen(false);
  };

  const t = useTranslations();

  const locale = useLocale() as Locale;

  // const backIcons: Record<Direction, ReactNode> = {
  //   rtl: <ArrowForward />,
  //   ltr: <ArrowBack />,
  // };
  // {backIcons[languages[locale].direction]}

  return (
    <>
      <SearchDialog open={open} onClose={handleToggleDialog}>
        <SearchSection
          onClickOnBack={handleToggleDialog}
          onClickOnSearch={onClickOnSearch}
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

export default MobileHeader;
