'use client';

import { GetAllProductsQuery } from '@/graphql/types/graphql';
import { Card, CardContent, CardHeader } from '@mui/material';
import { FC } from 'react';
import Slider from './components/Slider';
import { useTranslations } from 'next-intl';

export interface BestSellingProductsProps {
  items?: NonNullable<GetAllProductsQuery['products']>['nodes'];
}
const BestSellingProducts: FC<BestSellingProductsProps> = ({ items }) => {
  const t = useTranslations();
  return (
    <Card variant="outlined">
      <CardHeader
        title={t('header.navigation.bestSelling')}
        sx={{
          textAlign: 'center',
        }}
      />
      <CardContent>
        <Slider items={items} />
      </CardContent>
    </Card>
  );
};

export default BestSellingProducts;
