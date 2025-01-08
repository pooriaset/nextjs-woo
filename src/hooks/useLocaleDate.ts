import { Locale, languages } from '@/navigation';
import { useLocale } from 'next-intl';

const useLocaleDate = (value: string | number | Date | null | undefined) => {
  const locale = useLocale() as Locale;

  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString(
    languages[locale]?.code?.replace('_', '-').toLowerCase() ||
      navigator.language,
  );
};

export default useLocaleDate;
