import { Direction } from '@mui/material';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { faLocale } from './utils/yup';
import { LocaleObject } from 'yup';

export const locales = ['en', 'fa'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

export const languages: Record<
  Locale,
  {
    label: string;
    direction: Direction;
    code: string;
    yupLocale?: LocaleObject;
  }
> = {
  en: {
    label: 'English',
    direction: 'ltr',
    code: 'en-us',
  },
  fa: {
    label: 'Persian',
    direction: 'rtl',
    code: 'fa-ir',
    yupLocale: faLocale,
  },
};

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
