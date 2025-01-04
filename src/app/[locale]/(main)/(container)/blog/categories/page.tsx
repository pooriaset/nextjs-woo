import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_CATEGORIES } from '@/graphql/queries/blog';
import {
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
} from '@/graphql/types/graphql';
import { Stack, Typography } from '@mui/material';
import CategoryItem from './components/CategoryItem';
import { getTranslations } from 'next-intl/server';

const spacing = 2;
const Page = async () => {
  const { data } = await getClient().query<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >({
    query: GET_CATEGORIES,
  });

  const t = await getTranslations();

  return (
    <Stack spacing={spacing}>
      <Typography component="h1" variant="h6">
        {t('blog.categories')}
      </Typography>
      <Stack direction="row" spacing={spacing}>
        {data.categories?.edges.map(({ node }) => {
          return <CategoryItem data={node} key={node.databaseId} />;
        })}
      </Stack>
    </Stack>
  );
};

export default Page;
