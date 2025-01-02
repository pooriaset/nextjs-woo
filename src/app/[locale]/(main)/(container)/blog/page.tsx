import { Grid, Stack } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import ColumnSection from './components/ColumnSection';
import Filters from './components/Filters';
import Posts from './components/Posts';
import { Section } from './components/Section';

const spacing = 2;

const Page = async () => {
  const t = await getTranslations();
  return (
    <Stack gap={spacing}>
      <Grid container spacing={spacing}>
        <Grid item container xs={12} spacing={spacing} height="60vh">
          <Grid item md={6} xs={12}>
            <Section></Section>
          </Grid>
          <Grid container item md={6} xs={12} spacing={spacing}>
            <Grid item xs={12} md={6}>
              <Section></Section>
            </Grid>
            <Grid item xs={12} md={6}>
              <Section></Section>
            </Grid>
            <Grid item xs={12} md={6}>
              <Section></Section>
            </Grid>
            <Grid item xs={12} md={6}>
              <Section></Section>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={spacing} alignItems="flex-start">
          <Grid item container lg={3} md={12} xs={12} spacing={spacing}>
            <Filters spacing={spacing} />
          </Grid>
          <Grid item container lg={9} md={12} xs={12} spacing={spacing}>
            <Grid item xs={12}>
              <ColumnSection title={t('blog.latestArticles')} />
            </Grid>
            <Posts />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
