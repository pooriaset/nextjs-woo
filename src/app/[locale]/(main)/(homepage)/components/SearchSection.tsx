import useInputFiller from '@/hooks/useInputFiller';
import { Locale, languages } from '@/navigation';
import {
  ArrowBackOutlined,
  ArrowForwardOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { IconButton, IconButtonProps, TextField } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { DOMAttributes, FC } from 'react';

export interface SearchSectionProps {
  onClickOnBack?: IconButtonProps['onClick'];
  onClickOnSearch?: (q: string) => void;
}

const SearchSection: FC<SearchSectionProps> = ({
  onClickOnBack,
  onClickOnSearch,
}) => {
  const { inputRef } = useInputFiller();

  const onSubmit: DOMAttributes<HTMLFormElement>['onSubmit'] = (event) => {
    event.preventDefault();
    onClickOnSearch?.(event.currentTarget.q.value);
  };

  const t = useTranslations();

  const locale = useLocale();

  return (
    <form onSubmit={onSubmit}>
      <TextField
        inputRef={inputRef}
        autoComplete="off"
        name="q"
        placeholder={t('header.search.placeholder')}
        InputProps={{
          startAdornment: (
            <IconButton onClick={onClickOnBack}>
              {languages[locale as Locale].direction === 'rtl' ? (
                <ArrowForwardOutlined />
              ) : (
                <ArrowBackOutlined />
              )}
            </IconButton>
          ),
          endAdornment: (
            <IconButton type="submit">
              <SearchOutlined />
            </IconButton>
          ),
        }}
        fullWidth
        size="medium"
        variant="outlined"
      />
    </form>
  );
};

export default SearchSection;
