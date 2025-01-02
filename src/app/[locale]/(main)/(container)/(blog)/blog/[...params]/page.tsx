import LocaleDate from '@/components/LocaleDate/LocaleDate';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_POST } from '@/graphql/queries/blog';
import { GetPostQuery, GetPostQueryVariables } from '@/graphql/types/graphql';
import { AccessTimeOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { FC } from 'react';

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
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h6" component="h1">
          {post.title}
        </Typography>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <AccessTimeOutlined fontSize="small" />
            <LocaleDate value={post.dateGmt!} />
          </Typography>
        </Box>
      </Stack>

      <Box
        borderRadius={2}
        component="img"
        src={post.featuredImage?.node.sourceUrl!}
        alt={post.featuredImage?.node.altText || post.title!}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />

      <Typography
        variant="body1"
        sx={{
          textAlign: 'justify',
        }}
        dangerouslySetInnerHTML={{
          __html: post.content!,
        }}
      ></Typography>
    </Stack>
  );
};

export default Page;
