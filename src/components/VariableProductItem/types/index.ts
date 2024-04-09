import { GetAllVariableProductsQuery } from '@/graphql/types/graphql';

type ExtractVariableProduct<T> = T extends { __typename?: 'VariableProduct' }
  ? T
  : never;

export type VariableProduct = ExtractVariableProduct<
  NonNullable<GetAllVariableProductsQuery['products']>['nodes'][number]
>;
