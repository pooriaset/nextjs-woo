import { OrderEnum, ProductsOrderByEnum } from '@/graphql/types/graphql';

export interface ISortOptions {
  key: number;
  label: string;
  props: {
    field: ProductsOrderByEnum;
    order: OrderEnum;
  };
}
