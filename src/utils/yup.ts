import { LocaleObject } from 'yup';

export const faLocale: LocaleObject = {
  string: {
    length({ length, path }) {
      return `${path} باید ${length} کاراکتر باشد.`;
    },
    max: ({ max }) => {
      return `حداکثر ${max} کاراکتر مجاز است.`;
    },
    min: ({ min }) => {
      return `حداقل ${min} کاراکتر وارد کنید.`;
    },
    email: () => {
      return `لطفا ایمیل معتبری وارد نمایید.`;
    },
  },
  mixed: {
    required: `وارد کردن این فیلد اجباری است.`,
    notType: `وارد کردن این فیلد اجباری است.`,
  },
};
