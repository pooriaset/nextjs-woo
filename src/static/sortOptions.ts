import { OrderEnum, ProductsOrderByEnum } from '@/graphql/types/graphql';
import { ISortOptions } from './types/sort';

export const newestSortOption: ISortOptions = {
  key: 0,
  label: 'products.sort.items.newest',
  props: {
    field: ProductsOrderByEnum.Date,
    order: OrderEnum.Desc,
  },
};

export const bestSellingSortOption: ISortOptions = {
  key: 1,
  label: 'products.sort.items.bestSelling',
  props: {
    field: ProductsOrderByEnum.TotalSales,
    order: OrderEnum.Desc,
  },
};

export const menuOrderSortOptions: ISortOptions = {
  key: 1,
  label: 'products.sort.items.bestSelling',
  props: {
    field: ProductsOrderByEnum.MenuOrder,
    order: OrderEnum.Desc,
  },
};

export const sortOptions: ISortOptions[] = [
  newestSortOption,
  bestSellingSortOption,
  {
    key: 2,
    label: 'products.sort.items.popularity',
    props: {
      field: ProductsOrderByEnum.Rating,
      order: OrderEnum.Desc,
    },
  },
  {
    key: 3,
    label: 'products.sort.items.minimumPrice',
    props: {
      field: ProductsOrderByEnum.Price,
      order: OrderEnum.Asc,
    },
  },
  {
    key: 4,
    label: 'products.sort.items.maximumPrice',
    props: {
      field: ProductsOrderByEnum.Price,
      order: OrderEnum.Desc,
    },
  },
];
