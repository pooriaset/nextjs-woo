'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export enum SearchPageParams {
  Sort = 'sort',
  Q = 'q',
}

export interface IUseCustomSearchParams {
  (): {
    sort: string | null;
    q: string | null;
    navigate: (key: SearchPageParams, value: string | number) => void;
  };
}

const useCustomSearchParams: IUseCustomSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigate = (key: SearchPageParams, value: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value.toString());
    router.push(`/search?${params}`);
  };

  const sort = searchParams.get(SearchPageParams.Sort);
  const q = searchParams.get(SearchPageParams.Q);

  return { sort, q, navigate };
};

export default useCustomSearchParams;
