import { FC } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_SINGLE_VARIABLE_PRODUCT_QUERY } from '@/graphql/queries/products';
import { GetSingleProductQuery } from '@/graphql/types/graphql';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import type { Metadata } from 'next';
import BuyBox from './components/BuyBox';
import FindYourSize from './components/FindYourSize';
import ProductGallery from './components/ProductGallery';
import ProductTabs from './components/ProductTabs';
import SizeSelector from './components/SizeSelector';
import ProductProvider from './providers/ProductProvider';

type PageProps = {
  params: { params: string[] };
};

const title = 'test_title';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
    fetchPolicy: 'no-cache',
  });
  return data.product;
};

const Page: FC<PageProps> = async ({ params: { params } }) => {
  const product = await getProduct({ id: +params[0] });

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
    <ProductProvider
      value={{
        selectedVariantId: null,
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <ProductGallery
            thumbnail={product.image}
            galleryImages={product?.galleryImages?.nodes}
          />
        </Grid>
        <Grid item md={4} xs={12}>
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
              <SizeSelector variations={product.variations} />
            </Grid>
            <Grid item>
              <FindYourSize />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card variant="outlined">
            <CardContent>
              <BuyBox product={product} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <ProductTabs
            content={product.content}
            attributes={product.customAttributes?.nodes}
          />
        </Grid>
      </Grid>
    </ProductProvider>
  );
};

export default Page;
