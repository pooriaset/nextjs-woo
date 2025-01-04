import { useLocale } from 'next-intl';
import { FC } from 'react';

interface LocaleDate {
  value: string;
}
const LocaleDate: FC<LocaleDate> = ({ value }) => {
  const locale = useLocale();

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  } as const;

  const formattedDate = new Intl.DateTimeFormat(locale, options).format(
    new Date(value),
  );

  return formattedDate;
};

export default LocaleDate;
