import { FC } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { BuyBox } from '@/components/BuyBox';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_SINGLE_VARIABLE_PRODUCT_QUERY } from '@/graphql/queries/products';
import { GetSingleProductQuery } from '@/graphql/types/graphql';
import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';
import SizeSelector from './components/SizeSelector';
import ProductImage from './components/ProductImage';
import ProductGallery from './components/ProductGallery';
import ProductTabs from './components/ProductTabs';

type PageProps = {
  params: { id: string };
};

const title = 'test_title';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = params.id;

  return {
    title,
    alternates: {
      canonical: '',
    },
  };
}

const getProduct = async ({ id }: { id: number }) => {
  const { data } = await getClient().query<GetSingleProductQuery>({
    query: GET_SINGLE_VARIABLE_PRODUCT_QUERY,
    variables: {
      id,
    },
  });
  return data.product;
};

const Page: FC<PageProps> = async ({ params: { id } }) => {
  const product = await getProduct({ id: +id[0] });

  if (product?.__typename !== 'VariableProduct') {
    return null;
  }

  const breadcrumbItems = product?.productCategories?.nodes.map((item) => {
    return {
      id: item.id,
      name: item.name ?? '',
    };
  })!;

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProductImage value={product.image} />
            </Grid>
            <Grid item xs={12}>
              <ProductGallery value={product?.galleryImages?.nodes} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} xs={12}>
          <Breadcrumbs items={breadcrumbItems} />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              lineHeight: 2.1,
              fontSize: '1rem',
            }}
          >
            {product?.title}
          </Typography>
          <Divider />
          <Grid
            container
            spacing={1}
            sx={{
              mt: 2,
            }}
          >
            <Grid item>
              <SizeSelector items={product.variations} />
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card variant="outlined">
            <CardContent>
              <BuyBox />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <ProductTabs content={product.content} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page;
