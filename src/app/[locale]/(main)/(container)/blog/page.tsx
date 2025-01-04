import { Grid, Stack } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import ColumnSection from './components/ColumnSection';
import Filters from './components/Filters';
import Posts from './components/Posts';
import { Suspense } from 'react';
import PostsSkeleton from './components/PostsSkeleton';

const spacing = 2;

const Page = async () => {
  const t = await getTranslations();
  return (
    <Stack gap={spacing}>
      <Grid container spacing={spacing}>
        <Grid item container xs={12} spacing={spacing} alignItems="flex-start">
          <Grid item container lg={3} md={12} xs={12} spacing={spacing}>
            <Filters spacing={spacing} />
          </Grid>
          <Grid item container lg={9} md={12} xs={12} spacing={spacing}>
            <Grid item xs={12}>
              <ColumnSection title={t('blog.latestArticles')} />
            </Grid>
            <Suspense fallback={<PostsSkeleton />}>
              <Posts />
            </Suspense>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
