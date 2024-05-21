'use client';

import { GetAllProductsQuery } from '@/graphql/types/graphql';
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { VariableProductItem } from '@/components/VariableProductItem';

export interface BestSellingProductsProps {
  items?: NonNullable<GetAllProductsQuery['products']>['nodes'];
}
const BestSellingProducts: FC<BestSellingProductsProps> = ({ items }) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Card variant="outlined">
      <CardHeader
        title={t('header.navigation.bestSelling')}
        sx={{
          textAlign: 'center',
        }}
      />
      <CardContent>
        <Swiper
          dir={theme.direction}
          navigation={true}
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          breakpoints={{
            [theme.breakpoints.values.xs]: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            [theme.breakpoints.values.sm]: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            [theme.breakpoints.values.md]: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
            [theme.breakpoints.values.lg]: {
              slidesPerView: 6,
              spaceBetween: 16,
            },
          }}
          spaceBetween={theme.spacing(2)}
        >
          {items?.map((product) => {
            if (product.__typename === 'VariableProduct') {
              return (
                <SwiperSlide
                  key={product.databaseId}
                  style={{
                    height: 'auto',
                    boxSizing: 'border-box',
                  }}
                >
                  <VariableProductItem data={product} />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </CardContent>
    </Card>
  );
};

export default BestSellingProducts;
