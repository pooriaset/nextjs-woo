import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_CATEGORY } from '@/graphql/queries/blog';
import {
  GetCategoryQuery,
  GetCategoryQueryVariables,
} from '@/graphql/types/graphql';
import { getRefinedMetaDescription } from '@/utils/text';
import { Grid, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import ColumnSection from '../../../../components/ColumnSection';
import Posts from '../../../../components/Posts';
import { Metadata } from 'next';

type PageProps = { params: { slug: string; id: string } };

const getCategory = async (id: string) => {
  const { data } = await getClient().query<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >({
    query: GET_CATEGORY,
    variables: {
      id,
    },
  });

  return data.category;
};

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const category = await getCategory(id);

  if (!category) {
    return notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_URL!;
  const title = category.name || '';
  const description = getRefinedMetaDescription(category.description);
  const canonical = `/blog/categories/${id}/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonical}`,
      siteName: title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const category = await getCategory(id);

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
