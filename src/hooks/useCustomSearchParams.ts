'use client';

import { useRouter } from '@/navigation';
import {
  SearchPageParamsKeys,
  SearchPagesParams,
  getSearchPageParams,
} from '@/utils/params';
import { useSearchParams } from 'next/navigation';

export interface IUseCustomSearchParams {
  (): {
    navigate: (
      key: SearchPageParamsKeys,
      value: string | number | boolean | null,
    ) => void;
  } & SearchPagesParams;
}

const useCustomSearchParams: IUseCustomSearchParams = () => {
  const params = useSearchParams();
  const router = useRouter();

  const navigate: ReturnType<IUseCustomSearchParams>['navigate'] = (
    key,
    value,
  ) => {
    const newParams = new URLSearchParams(params);
    if (value === undefined || value === null || +value < 0) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
    router.push(`/search?${newParams}`);
  };

  return {
    navigate,
    ...getSearchPageParams(params),
  };
};

export default useCustomSearchParams;
