'use client';

import { usePathname, useRouter } from '@/navigation';
import {
  SearchPageParamsKeys,
  SearchPagesParams,
  getSearchPageParams,
} from '@/utils/params';
import { useSearchParams } from 'next/navigation';

export interface IUseSearchPageParams {
  (): {
    navigate: (
      key: SearchPageParamsKeys,
      value: string | number | boolean | null,
    ) => void;
    clear: () => void;
    count: number;
  } & SearchPagesParams;
}

const useSearchPageParams: IUseSearchPageParams = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const count = params.size;

  const _redirect = (target: string) => {
    if (pathname.includes('/search')) {
      window.history.pushState(null, '', target);
    } else {
      router.push(target);
    }
  };

  const navigate: ReturnType<IUseSearchPageParams>['navigate'] = (
    key,
    value,
  ) => {
    const newParams = new URLSearchParams(params);
    if (value === undefined || value === null || +value < 0) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }

    const target = `/search?${newParams}`;
    _redirect(target);
  };

  const clear = () => {
    const target = `/search`;
    _redirect(target);
  };

  return {
    navigate,
    clear,
    count,
    ...getSearchPageParams(params),
  };
};

export default useSearchPageParams;
