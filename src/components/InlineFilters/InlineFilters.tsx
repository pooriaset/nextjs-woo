'use client';

import { CategoriesQuery } from '@/graphql/types/graphql';
import { sortOptions } from '@/static/sortOptions';
import { SortOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface InlineFiltersProps {
  categories?: NonNullable<CategoriesQuery['productCategories']>['nodes'];
}
const InlineFilters: FC<InlineFiltersProps> = ({ categories }) => {
  const t = useTranslations();
  return (
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
      <Button variant="outlined" size="small" endIcon={<SortOutlined />}>
        {t(sortOptions[0].label)}
      </Button>
      <Button
        variant="outlined"
        size="small"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t('products.filters.categories')}
      </Button>
    </Box>
  );
};

export default InlineFilters;
