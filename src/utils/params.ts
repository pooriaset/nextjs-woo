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

export const getSearchPageParams = (params: any): SearchPagesParams => {
  const _params = params.get ? params : new Map(Object.entries(params));

  const sortParam = _params.get(SearchPageParamsKeys.Sort);
  const sort = sortParam ? +sortParam : sortOptions[0].key;
  const q = _params.get(SearchPageParamsKeys.Q);
  const inStock = _params.has(SearchPageParamsKeys.InStock)
    ? _params.get(SearchPageParamsKeys.InStock) === 'true'
    : true;
  const categoryId = _params.has(SearchPageParamsKeys.CategoryId)
    ? +_params.get(SearchPageParamsKeys.CategoryId)
    : null;

  return {
    q,
    inStock,
    sort,
    categoryId,
  };
};
