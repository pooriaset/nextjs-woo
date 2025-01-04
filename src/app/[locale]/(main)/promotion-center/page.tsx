import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('header.navigation.promotions'),
  };
}

const page = async () => {
  return <></>;
};

export default page;
