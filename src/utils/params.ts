import { sortOptions } from '@/static/sortOptions';

export enum SearchPageParamsKeys {
  Sort = 'sort',
  Q = 'q',
  InStock = 'inStock',
  CategoryId = 'categoryId',
}

export interface SearchPagesParams {
  sort: number | null;
  q: string | null;
  inStock: boolean;
  categoryId: number | null;
}

export const getSearchPageParams = (
  params: URLSearchParams,
): SearchPagesParams => {
  const sortParam = params.get(SearchPageParamsKeys.Sort);
  const sort = sortParam ? +sortParam : sortOptions[0].key;
  const q = params.has(SearchPageParamsKeys.Q)
    ? (params.get(SearchPageParamsKeys.Q) as string)
    : null;
  const inStock = params.has(SearchPageParamsKeys.InStock)
    ? params.get(SearchPageParamsKeys.InStock) === 'true'
    : true;
  const categoryId = params.has(SearchPageParamsKeys.CategoryId)
    ? +params.get(SearchPageParamsKeys.CategoryId)!
    : null;

  return {
    q,
    inStock,
    sort,
    categoryId,
  };
};
