import Dialog from '@/components/Dialog/Dialog';
import { ProductsFilters } from '@/components/ProductsFilters';
import useSearchPageParams from '@/hooks/useSearchPageParams';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const FiltersButton = () => {
  const t = useTranslations();
  const [filtersDialog, setFiltersDialog] = useState(false);

  const { count, clear } = useSearchPageParams();

  const onToggleFiltersDialog = () => {
    setFiltersDialog((prevState) => !prevState);
  };

  const handleClickOnClear = () => {
    clear();
    onToggleFiltersDialog();
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
          {
            id: 'clear-filters',
            children: t('products.filters.buttons.removeFilters'),
            ...(!!count
              ? {
                  color: 'error',
                  variant: 'outlined',
                }
              : {
                  color: 'inherit',
                  variant: 'contained',
                  disabled: true,
                }),

            size: 'large',
            fullWidth: true,
            onClick: handleClickOnClear,
          },
        ]}
      >
        <ProductsFilters />
      </Dialog>

      <Button
        color="inherit"
        variant="outlined"
        size="small"
        endIcon={<KeyboardArrowDown />}
        onClick={onToggleFiltersDialog}
        startIcon={
          !!count && (
            <Box
              width={18}
              height={18}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) => theme.palette.error.main,
                borderRadius: '50%',
                color: '#fff',
                fontSize: (theme) =>
                  `${theme.typography.caption.fontSize} !important`,
              }}
            >
              {count}
            </Box>
          )
        }
      >
        {t('products.filters.title')}
      </Button>
    </>
  );
};

export default FiltersButton;
