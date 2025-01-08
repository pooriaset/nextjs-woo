import { Direction } from '@mui/material';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { faLocale } from './utils/yup';
import { LocaleObject } from 'yup';
import { CountriesEnum } from './graphql/types/graphql';

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
    country?: CountriesEnum;
  }
> = {
  en: {
    label: 'English',
    direction: 'ltr',
    code: 'en_US',
    country: CountriesEnum.Us,
  },
  fa: {
    label: 'Persian',
    direction: 'rtl',
    code: 'fa_IR',
    yupLocale: faLocale,
    country: CountriesEnum.Ir,
  },
};

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
