import { CategoriesQuery } from '@/graphql/types/graphql';

export type ProductCategoryOptions = NonNullable<
  CategoriesQuery['productCategories']
>['nodes'];
