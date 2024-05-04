import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { SearchOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import SearchDialog from './SearchDialog';
import SearchSection from './SearchSection';
import { useTranslations } from 'next-intl';

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
  return (
    <>
      <Box
        onClick={handleToggleDialog}
        sx={{
          my: 1,
          backgroundColor: grey[200],
          width: '100%',
          borderRadius: (theme) => theme.shape.borderRadius / 8,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
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
      <SearchDialog open={open} onClose={handleToggleDialog}>
        <SearchSection
          onClickOnBack={handleToggleDialog}
          onClickOnSearch={onClickOnSearch}
        />
      </SearchDialog>
    </>
  );
};

export default MobileHeader;
