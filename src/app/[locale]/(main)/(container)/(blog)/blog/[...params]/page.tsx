import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_POST } from '@/graphql/queries/blog';
import { GetPostQuery, GetPostQueryVariables } from '@/graphql/types/graphql';
import { Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

export type PageProps = {
  params: { params: string[] };
};

const getPost = async (id: string) => {
  const { data } = await getClient().query<GetPostQuery, GetPostQueryVariables>(
    {
      query: GET_POST,
      variables: {
        id,
      },
    },
  );

  const post = data?.post;
  return post;
};

export async function generateMetadata(props: PageProps) {
  const id = props.params.params[0];

  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const id = params.params[0];
  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <Typography variant="h6" component="h1">
        {post.title}
      </Typography>
    </div>
  );
};

export default Page;
