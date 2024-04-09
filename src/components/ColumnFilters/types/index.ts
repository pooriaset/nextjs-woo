import { CategoriesQuery } from '@/graphql/types/graphql';

export type Options = NonNullable<
  CategoriesQuery['productCategories']
>['nodes'];
