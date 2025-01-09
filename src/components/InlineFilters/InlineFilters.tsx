'use client';

import useSearchPageParams from '@/hooks/useSearchPageParams';
import { sortOptions } from '@/static/sortOptions';
import { SearchPageParamsKeys } from '@/utils/params';
import { SortOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { ProductsFilters } from '../ProductsFilters';
import Dialog from '../Dialog/Dialog';

export interface InlineFiltersProps {}
const InlineFilters: FC<InlineFiltersProps> = () => {
  const t = useTranslations();

  const { sort, navigate } = useSearchPageParams();

  const [sortDialog, setSortDialog] = useState(false);

  const onOpenSortDialog = () => {
    setSortDialog(true);
  };

  const onCloseSortDialog = () => {
    setSortDialog(false);
  };

  const onSortChange: RadioGroupProps['onChange'] = (_event, value: string) => {
    onCloseSortDialog();
    navigate(SearchPageParamsKeys.Sort, value);
  };

  const selectedSort = sortOptions.find((item) => item.key === sort);

  const [filtersDialog, setFiltersDialog] = useState(false);

  const onToggleFiltersDialog = () => {
    setFiltersDialog((prevState) => !prevState);
  };

  return (
    <>
      <Dialog
        open={filtersDialog}
        onClose={onToggleFiltersDialog}
        title={t('products.filters.title')}
        buttons={[
          {
            id: 'view-products',
            children: t('buttons.viewProducts'),
            variant: 'contained',
            color: 'primary',
            size: 'large',
            fullWidth: true,
            onClick: onToggleFiltersDialog,
          },
        ]}
      >
        <ProductsFilters />
      </Dialog>

      <Dialog
        key={sort}
        open={sortDialog}
        onClose={onCloseSortDialog}
        title={t('products.sort.title')}
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="sort-radio-buttons-group-label"
            value={sort}
            onChange={onSortChange}
          >
            {sortOptions.map((option) => {
              return (
                <FormControlLabel
                  key={option.label}
                  value={option.key}
                  control={<Radio />}
                  label={t(option.label)}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Dialog>

      <Box
        sx={{
          pb: 1,
          borderBottom: '1px solid',
          borderColor: (theme) => theme.palette.divider,
          position: 'sticky',
          left: 0,
          right: 0,
          display: 'flex',
          maxWidth: '100%',
          overflowX: 'auto',
          gap: 1,
          mb: 1,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          endIcon={<SortOutlined />}
          onClick={onOpenSortDialog}
        >
          {t(selectedSort?.label || sortOptions[0].label)}
        </Button>
        <Button
          variant="outlined"
          size="small"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={onToggleFiltersDialog}
        >
          {t('products.filters.title')}
        </Button>
      </Box>
    </>
  );
};

export default InlineFilters;
