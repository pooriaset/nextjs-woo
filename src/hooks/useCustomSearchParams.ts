'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

enum SearchPageParams {
  Sort = 'sort',
  Q = 'q',
  InStock = 'inStock',
}

export interface ReturnTypeOfUseCustomSearchParams {
  sort: string | null;
  q: string | null;
  inStock: boolean;
  navigate: (
    key: keyof typeof SearchPageParams,
    value: string | number | boolean,
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
    params.set(SearchPageParams[key], value.toString());
    router.push(`/search?${params}`);
  };

  const sort = searchParams.get(SearchPageParams.Sort);
  const q = searchParams.get(SearchPageParams.Q);
  const inStock = searchParams.get(SearchPageParams.InStock) === 'true';

  return { q, inStock, sort, navigate };
};

export default useCustomSearchParams;
