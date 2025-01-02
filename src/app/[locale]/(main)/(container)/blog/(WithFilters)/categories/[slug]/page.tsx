import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_CATEGORY } from '@/graphql/queries/blog';
import {
  GetCategoryQuery,
  GetCategoryQueryVariables,
} from '@/graphql/types/graphql';
import { Grid, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import Posts from '../../../components/Posts';
import ColumnSection from '../../../components/ColumnSection';

type PageProps = { params: { slug: string } };

const getCategory = async (slug: string) => {
  const { data } = await getClient().query<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >({
    query: GET_CATEGORY,
    variables: {
      id: slug,
    },
  });

  return data.category;
};

export async function generateMetadata({ params: { slug } }: PageProps) {
  const category = await getCategory(slug);

  if (!category) {
    return notFound();
  }

  return {
    title: category.name,
  };
}

const Page: FC<PageProps> = async ({ params: { slug } }) => {
  const category = await getCategory(slug);

  if (!category) {
    return notFound();
  }

  return (
    <Grid container spacing={2}>
      {!!category.name && (
        <Grid item xs={12}>
          <ColumnSection
            title={category.name}
            typographyProps={{
              component: 'h1',
            }}
          />
        </Grid>
      )}

      <Posts categoryIn={[category.databaseId.toString()]} />

      {!!category.description && (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: category.description,
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Page;
