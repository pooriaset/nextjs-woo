'use client';

import { usePathname, useRouter } from '@/navigation';
import {
  BlogPageParamsEnum,
  BlogPagesParams,
  getBlogPageParams,
} from '@/utils/params';
import { useSearchParams } from 'next/navigation';

export interface IUseBlogPageParams {
  (): {
    navigate: (
      items: Partial<
        Record<BlogPageParamsEnum, string | number | boolean | null>
      >,
    ) => void;
  } & BlogPagesParams;
}

const useBlogPageParams: IUseBlogPageParams = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const navigate: ReturnType<IUseBlogPageParams>['navigate'] = (items) => {
    const newParams = new URLSearchParams(params);

    Object.keys(items).forEach((key) => {
      const value = items[key as BlogPageParamsEnum];

      if (value === undefined || value === null || +value < 0) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });

    const target = `/blog?${newParams}`;
    if (pathname == '/blog') {
      window.history.pushState(null, '', target);
    } else {
      router.push(target);
    }
  };

  return {
    navigate,
    ...getBlogPageParams(params),
  };
};

export default useBlogPageParams;
