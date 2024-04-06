'use client';

import { CategoriesQuery } from '@/gql/graphql';
import { SortOutlined } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button } from '@mui/material';
import { FC } from 'react';

export interface InlineFiltersProps {
  options?: NonNullable<CategoriesQuery['productCategories']>['nodes'];
}
const InlineFilters: FC<InlineFiltersProps> = () => {
  return (
    <Box
      py={1}
      sx={{
        borderBottom: '1px solid',
        borderColor: (theme) => theme.palette.divider,
        position: 'sticky',
        left: 0,
        right: 0,
        display: 'flex',
        maxWidth: '100%',
        overflowX: 'auto',
        gap: 1,
        px: (theme) => theme.spacing(3),
      }}
    >
      <Button variant="outlined" size="small" endIcon={<SortOutlined />}>
        مرتبط‌ترین
      </Button>
      <Button
        variant="outlined"
        size="small"
        endIcon={<KeyboardArrowDownIcon />}
      >
        دسته‌بندی
      </Button>
    </Box>
  );
};

export default InlineFilters;
