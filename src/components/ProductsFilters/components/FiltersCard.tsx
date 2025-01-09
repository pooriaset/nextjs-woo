'use client';

import useSearchPageParams from '@/hooks/useSearchPageParams';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { FC, ReactNode } from 'react';

export interface FiltersCardProps {
  children: ReactNode;
}
const FiltersCard: FC<FiltersCardProps> = ({ children }) => {
  const t = useTranslations();

  const { clear, count } = useSearchPageParams();

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'sticky',
        top: 130,
      }}
    >
      <CardHeader
        titleTypographyProps={{
          variant: 'h6',
        }}
        title={t('products.filters.title')}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
        action={
          !!count && (
            <Button color="error" onClick={clear}>
              {t('products.filters.buttons.removeFilters')}
            </Button>
          )
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FiltersCard;
