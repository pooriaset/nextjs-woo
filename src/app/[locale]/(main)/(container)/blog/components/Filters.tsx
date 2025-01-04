'use client';

import { Grid } from '@mui/material';
import React, { FC } from 'react';
import ColumnSection from './ColumnSection';
import SearchBox from './SearchBox';
import CategoriesFilter from './CategoriesFilter';
import { useTranslations } from 'next-intl';

export interface FiltersProps {
  spacing?: number;
}
const Filters: FC<FiltersProps> = ({ spacing }) => {
  const t = useTranslations();
  return (
    <>
      <Grid item xs={12}>
        <ColumnSection spacing={spacing} title={t('blog.search')}>
          <SearchBox />
        </ColumnSection>
      </Grid>
      <Grid item xs={12}>
        <ColumnSection spacing={spacing} title={t('blog.categories')}>
          <CategoriesFilter />
        </ColumnSection>
      </Grid>
    </>
  );
};

export default Filters;
