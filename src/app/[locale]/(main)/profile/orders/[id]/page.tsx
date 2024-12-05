'use client';

import { GET_ORDER } from '@/graphql/queries/order';
import { GetOrderQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import { CircularProgress, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FC } from 'react';
import CardHeader from '../../components/CardHeader';

type PageProps = {
  params: { id: string };
};

const Page: FC<PageProps> = (props) => {
  const {
    params: { id },
  } = props;

  const { data, loading, error } = useQuery<GetOrderQuery>(GET_ORDER, {
    variables: {
      id: +id,
    },
  });

  if (loading || !error) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <CircularProgress size={28} />
      </Stack>
    );
  }

  const order = data?.order;

  return (
    <Card variant="outlined">
      <CardContent>
        <CardHeader title="جزئیات سفارش" back />
      </CardContent>
    </Card>
  );
};

export default Page;
