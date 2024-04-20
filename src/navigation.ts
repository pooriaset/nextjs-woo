import { Direction } from '@mui/material';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const defaultLocale = 'fa' as const;
export const locales = ['en', 'fa'] as const;

export const languages: Record<
  Locale,
  {
    label: string;
    direction: Direction;
  }
> = {
  en: {
    label: 'English',
    direction: 'ltr',
  },
  fa: {
    label: 'Persian',
    direction: 'rtl',
  },
};

export type Locale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
