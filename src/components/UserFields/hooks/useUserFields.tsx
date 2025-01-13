import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export type UserFieldNames = Partial<
  Record<
    | 'address1'
    | 'city'
    | 'state'
    | 'firstName'
    | 'lastName'
    | 'phone'
    | 'postcode',
    string | null
  >
>;

const useUserFields = () => {
  const t = useTranslations();

  const labels: UserFieldNames = {
    firstName: t('fields.firstName'),
    lastName: t('fields.lastName'),
    state: t('fields.state'),
    city: t('fields.city'),
    address1: t('fields.address1'),
    postcode: t('fields.postcode'),
    phone: t('fields.phone'),
  };

  const schema: yup.ObjectSchema<UserFieldNames> = yup.object({
    firstName: yup.string().nullable().required().label(labels.firstName!),
    lastName: yup.string().nullable().required().label(labels.lastName!),
    state: yup.string().nullable().required().label(labels.state!),
    city: yup.string().nullable().required().label(labels.city!),
    phone: yup.string().nullable().required().label(labels.phone!),
    postcode: yup.string().nullable().label(labels.postcode!),
    address1: yup.string().nullable().required().label(labels.address1!),
  });

  return { labels, schema };
};

export default useUserFields;
