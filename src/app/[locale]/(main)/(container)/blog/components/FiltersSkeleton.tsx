'use client';

import { Grid, Skeleton, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import ColumnSection from './ColumnSection';

export interface FiltersSkeletonProps {
  spacing?: number;
}
const FiltersSkeleton: FC<FiltersSkeletonProps> = ({ spacing }) => {
  const t = useTranslations();
  return (
    <>
      <Grid item xs={12}>
        <ColumnSection spacing={spacing} title={t('blog.search')}>
          <Skeleton variant="rectangular" width="100%" height={45} />
        </ColumnSection>
      </Grid>
      <Grid item xs={12}>
        <ColumnSection spacing={spacing} title={t('blog.categories')}>
          <Stack spacing={spacing}>
            <Skeleton variant="rectangular" width="100%" height={35} />
            <Skeleton variant="rectangular" width="100%" height={35} />
            <Skeleton variant="rectangular" width="100%" height={35} />
            <Skeleton variant="rectangular" width="100%" height={35} />
          </Stack>
        </ColumnSection>
      </Grid>
    </>
  );
};

export default FiltersSkeleton;
