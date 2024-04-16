/**
 * This module provides utilities for managing navigation and
 * locale information in Next.js application using next-intl.
 *
 * @see https://next-intl-docs.vercel.app/docs/routing/navigation
 * @see https://github.com/meienberger/runtipi/blob/develop/src/shared/internationalization/locales.ts
 */

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

// todo: finish the new version of this file:
// todo: src/islands/switchers/navigation-new-beta.tsx

// Default locale for the application.
// export const defaultLocale = "en-us";
export const defaultLocale = 'fa' as const;

// Supported locales.
export const locales = ['en', 'fa'] as const;

// Labels for each supported locale, used for displaying human-readable names.
export const labels = {
  en: 'English',
  fa: 'Persian',
} as const;

// Type representing valid locale strings.
export type Locale = (typeof locales)[number];

// Ensure every locale has a label.
if (process.env.NODE_ENV === 'development') {
  // biome-ignore lint/complexity/noForEach: <explanation>
  locales.forEach((locale) => {
    if (!labels[locale]) {
      console.warn(`No label found for locale: ${locale}`);
    }
  });
}

// Navigation utilities configured for the defined locales.
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
