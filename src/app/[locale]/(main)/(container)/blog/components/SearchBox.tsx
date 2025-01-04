import useBlogPageParams from '@/hooks/useBlogPageParams';
import { Search } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { DOMAttributes } from 'react';

const SearchBox = () => {
  const t = useTranslations();

  const params = useBlogPageParams();

  const onSubmit: DOMAttributes<HTMLFormElement>['onSubmit'] = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const value = (target.elements.namedItem('search') as HTMLInputElement)
      .value;
    params.navigate({ search: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="search"
        fullWidth
        defaultValue={params.search}
        variant="outlined"
        placeholder={t('blog.search')}
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
