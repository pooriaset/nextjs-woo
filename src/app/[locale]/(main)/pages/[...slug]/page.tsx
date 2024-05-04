import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_PAGE } from '@/graphql/queries/pages';
import { GetPageQuery } from '@/graphql/types/graphql';
import { Locale } from '@/navigation';
import { Container, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

type IPage = NonNullable<GetPageQuery['pages']>['edges'][number]['node'];

const getPage = async ({ slug }: { slug: string }): Promise<IPage | null> => {
  if (!slug) {
    return null;
  }

  const { data } = await getClient().query<GetPageQuery>({
    query: GET_PAGE,
    variables: {
      slug,
    },
  });
  return data?.pages?.edges?.[0].node || null;
};

interface PageProps {
  params: { locale: Locale; slug: string[] };
  searchParams: any[];
}

export async function generateMetadata(props: PageProps) {
  const slug = props.params.slug?.[0];

  const page = await getPage({ slug });

  return {
    title: page?.title,
  };
}

const page: FC<PageProps> = async ({ params }) => {
  const slug = params.slug?.[0];

  const page = await getPage({ slug });

  if (!page?.content) {
    notFound();
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {page.title}
      </Typography>

      <Typography
        component="div"
        sx={{
          textAlign: 'justify',
          lineHeight: 2,
        }}
        dangerouslySetInnerHTML={{
          __html: page.content,
        }}
      />
    </Container>
  );
};

export default page;
