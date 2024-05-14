import { OrderEnum, ProductsOrderByEnum } from '@/graphql/types/graphql';

export interface ISortOptions {
  key: number;
  label: any;
  props: {
    field: ProductsOrderByEnum;
    order: OrderEnum;
  };
}
