import { Search } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

const SearchBox = () => {
  const t = useTranslations();

  return (
    <form>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t('header.search.placeholder')}
        InputProps={{
          endAdornment: (
            <IconButton type="submit">
              <Search />
            </IconButton>
          ),
        }}
      />
    </form>
  );
};

export default SearchBox;
