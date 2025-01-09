'use client';

import IconButtonWithLoading from '@/components/common/IconButtonWithLoading';
import useInputFiller from '@/hooks/useInputFiller';
import useSearchPageParams from '@/hooks/useSearchPageParams';
import { Locale, languages } from '@/navigation';
import { SearchPageParamsKeys } from '@/utils/params';
import {
  ArrowBackOutlined,
  ArrowForwardOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import { IconButton, IconButtonProps, TextField } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { DOMAttributes, FC, useTransition } from 'react';

export interface ProductSearchFormProps {
  onClickOnBack?: IconButtonProps['onClick'];
  onClickOnSearch?: VoidFunction;
}

const ProductSearchForm: FC<ProductSearchFormProps> = ({
  onClickOnBack,
  onClickOnSearch,
}) => {
  const { inputRef } = useInputFiller();

  const [isPending, startTransition] = useTransition();

  const searchPageParams = useSearchPageParams();

  const onSubmit: DOMAttributes<HTMLFormElement>['onSubmit'] = (event) => {
    event.preventDefault();

    startTransition(() => {
      searchPageParams.navigate(
        SearchPageParamsKeys.Q,
        event.currentTarget.q.value,
      );
    });
    onClickOnSearch?.();
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
          startAdornment: !!onClickOnBack && (
            <IconButton onClick={onClickOnBack}>
              {languages[locale as Locale].direction === 'rtl' ? (
                <ArrowForwardOutlined />
              ) : (
                <ArrowBackOutlined />
              )}
            </IconButton>
          ),
          endAdornment: (
            <IconButtonWithLoading isLoading={isPending} type="submit">
              <SearchOutlined />
            </IconButtonWithLoading>
          ),
        }}
        fullWidth
        size="medium"
        variant="outlined"
      />
    </form>
  );
};

export default ProductSearchForm;
