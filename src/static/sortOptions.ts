import { OrderEnum, ProductsOrderByEnum } from '@/graphql/types/graphql';
import { ISortOptions } from './types/sort';

export const sortOptions: ISortOptions[] = [
  {
    key: 0,
    label: 'جدیدترین',
    props: {
      field: ProductsOrderByEnum.Date,
      order: OrderEnum.Desc,
    },
  },
  {
    key: 1,
    label: 'پرفروش‌ترین',
    props: {
      field: ProductsOrderByEnum.TotalSales,
      order: OrderEnum.Desc,
    },
  },
  {
    key: 2,
    label: 'محبوب‌‌ترین',
    props: {
      field: ProductsOrderByEnum.Rating,
      order: OrderEnum.Desc,
    },
  },
  {
    key: 3,
    label: 'ارزان‌ترین',
    props: {
      field: ProductsOrderByEnum.Price,
      order: OrderEnum.Asc,
    },
  },
  {
    key: 4,
    label: 'گران‌ترین',
    props: {
      field: ProductsOrderByEnum.Price,
      order: OrderEnum.Desc,
    },
  },
];
