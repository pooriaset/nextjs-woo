import { GetSingleProductQuery } from '@/graphql/types/graphql';

export type Product = NonNullable<GetSingleProductQuery['product']>;
export type Variations = Extract<
  Product,
  { __typename?: 'VariableProduct' }
>['variations'];
