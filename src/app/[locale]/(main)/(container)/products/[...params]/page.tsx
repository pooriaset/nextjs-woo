import { FC } from 'react';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_SINGLE_VARIABLE_PRODUCT_QUERY } from '@/graphql/queries/products';
import { GetSingleProductQuery } from '@/graphql/types/graphql';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';
import BuyBox from './components/BuyBox';
import ProductGallery from './components/ProductGallery';
import ProductTabs from './components/ProductTabs';
import VariantSelector from './components/VariantSelector';
import ProductProvider from './providers/ProductProvider';

type PageProps = {
  params: { params: string[] };
};

export async function generateMetadata({
  params: { params },
}: PageProps): Promise<Metadata> {
  const product = await getProduct({ id: +params[0] });

  let title = '';
  if (product?.__typename === 'VariableProduct') {
    title = product?.title!;
  }

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

  return data?.product || { __typename: 'SimpleProduct' };
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
    <ProductProvider>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <ProductGallery
            thumbnail={product.image}
            galleryImages={product?.galleryImages?.nodes}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Stack spacing={2}>
            <Stack>
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
            </Stack>
            <VariantSelector variations={product.variations} />
          </Stack>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card variant="outlined">
            <CardContent
              sx={{
                paddingBottom: '16px !important',
              }}
            >
              <BuyBox product={product} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ProductTabs
        content={product.content}
        attributes={product.globalAttributes?.nodes}
      />
    </ProductProvider>
  );
};

export default Page;
