import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_ALL_CATEGORIES_QUERY } from '@/graphql/queries/categories';
import { GetAllCategoriesQuery } from '@/graphql/types/graphql';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Content from './components/Content';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t('header.navigation.categories'),
  };
}

const Page = async () => {
  const { data } = await getClient().query<GetAllCategoriesQuery>({
    query: GET_ALL_CATEGORIES_QUERY,
    variables: {
      first: 10000,
    },
  });

  const categories = data?.productCategories?.nodes || [];

  return <Content categories={categories} />;
};

export default Page;
