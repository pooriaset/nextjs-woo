import en from '../data/i18n/en.json';
type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BACKEND_URL: string;
      NEXT_PUBLIC_GATEWAY_URL: string;
    }
  }

  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };
}
