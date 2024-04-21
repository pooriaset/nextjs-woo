import { FC } from 'react';

import Breadcrumbs, {
  BreadcrumbItem,
} from '@/components/Breadcrumbs/Breadcrumbs';
import { BuyBox } from '@/components/BuyBox';
import { ProductImages } from '@/components/ProductImages';
import SizeSelector from '@/components/SizeSelector/SizeSelector';
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

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

const Page: FC<PageProps> = () => {
  const t = useTranslations();
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      id: 1,
      title: 'Main Category',
    },
    {
      id: 2,
      title: 'Sub Category',
    },
  ];
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <ProductImages />
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
            {title}
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
              <SizeSelector items={[41, 42, 43, 44]} />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  height: '100%',
                  minWidth: 'fit-content',
                }}
              >
                {t('buttons.findYourSize')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent
              sx={{
                backgroundColor: grey[100],
              }}
            >
              <BuyBox />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page;
