'use client';

import { useRouter } from '@/navigation';
import { sortOptions } from '@/static/sortOptions';
import { useSearchParams } from 'next/navigation';

enum SearchPageParams {
  Sort = 'sort',
  Q = 'q',
  InStock = 'inStock',
  CategoryId = 'categoryId',
}

export interface ReturnTypeOfUseCustomSearchParams {
  sort: number | null;
  q: string | null;
  inStock: boolean;
  categoryId: number | null;
  navigate: (
    key: keyof typeof SearchPageParams,
    value: string | number | boolean | null,
  ) => void;
}

export interface IUseCustomSearchParams {
  (): ReturnTypeOfUseCustomSearchParams;
}

const useCustomSearchParams: IUseCustomSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigate: ReturnTypeOfUseCustomSearchParams['navigate'] = (
    key,
    value,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value === undefined || value === null || +value < 0) {
      params.delete(SearchPageParams[key]);
    } else {
      params.set(SearchPageParams[key], value.toString());
    }
    router.push(`/search?${params}`);
  };

  const sortParam = searchParams.get(SearchPageParams.Sort);
  const sort = sortParam ? +sortParam : sortOptions[0].key;

  const q = searchParams.get(SearchPageParams.Q);
  const inStock = searchParams.has(SearchPageParams.InStock)
    ? searchParams.get(SearchPageParams.InStock) === 'true'
    : true;
  const categoryId = searchParams.get(SearchPageParams.CategoryId);

  return {
    q,
    inStock,
    sort,
    navigate,
    categoryId: categoryId ? +categoryId : null,
  };
};

export default useCustomSearchParams;
