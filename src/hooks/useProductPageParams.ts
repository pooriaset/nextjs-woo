'use client';

import {
  ProductPageEnum,
  ProductPageParams,
  getProductPageParams,
} from '@/utils/params';
import { useSearchParams } from 'next/navigation';

export interface IUseProductPageParams {
  (): {
    navigate: (
      items: Partial<Record<ProductPageEnum, string | number | boolean | null>>,
    ) => void;
  } & ProductPageParams;
}

const useProductPageParams: IUseProductPageParams = () => {
  const params = useSearchParams();

  const navigate: ReturnType<IUseProductPageParams>['navigate'] = (items) => {
    const newParams = new URLSearchParams(params);

    Object.keys(items).forEach((key) => {
      const value = items[key as ProductPageEnum];

      if (value === undefined || value === null || +value < 0) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    window.history.pushState(null, '', `${location.pathname}?${newParams}`);
  };

  return {
    navigate,
    ...getProductPageParams(params),
  };
};

export default useProductPageParams;
