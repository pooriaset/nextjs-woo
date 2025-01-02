'use client';

import { Divider, Grid, Stack, TabsProps, Typography } from '@mui/material';
import { useState } from 'react';
import Column from './components/Column';
import Posts from './components/Posts';
import { Section } from './components/Section';

const spacing = 2;

function a11yProps(index: number) {
  return {
    id: `category-tab-${index}`,
    'aria-controls': `category-tabpanel-${index}`,
  };
}

const Page = () => {
  const [tab, setTab] = useState(0);

  const handleChangeTab: TabsProps['onChange'] = (_event, value: number) => {
    setTab(value);
  };

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
          <Grid item container lg={3} md={12} xs={12}>
            <Column spacing={spacing} />
          </Grid>
          <Grid item container lg={9} md={12} xs={12} spacing={spacing}>
            <Grid item xs={12}>
              <Divider>
                <Typography>آخرین مقالات</Typography>
              </Divider>
            </Grid>
            <Posts />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
