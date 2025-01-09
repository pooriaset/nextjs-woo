import { GetAllCategoriesQuery } from '@/graphql/types/graphql';

export type ProductCategoryOptions = NonNullable<
  GetAllCategoriesQuery['productCategories']
>['nodes'];
