'use client';

import { Stack } from '@mui/material';
import { FC } from 'react';
import ProductSearchForm from '../ProductSearchForm/ProductSearchForm';
import FiltersButton from './components/FiltersButton';
import SortButton from './components/SortButton';

export interface InlineFiltersProps {}
const InlineFilters: FC<InlineFiltersProps> = () => {
  return (
    <Stack
      spacing={1}
      sx={{
        py: 1.5,
        position: 'sticky',
        top: 0,
        maxWidth: '100%',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <ProductSearchForm />
      <Stack
        direction="row"
        spacing={1}
        flexWrap="nowrap"
        sx={{
          overflowX: 'auto',
        }}
      >
        <SortButton />
        <FiltersButton />
      </Stack>
    </Stack>
  );
};

export default InlineFilters;
