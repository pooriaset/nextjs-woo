'use client';

import { Divider, Grid, Stack, TabsProps, Typography } from '@mui/material';
import { useState } from 'react';
import Categories from './components/Categories';
import SearchBox from './components/SearchBox';
import { Section } from './components/Section';
import Posts from './components/Posts';

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
      <Section
        sx={{
          height: 400,
        }}
      ></Section>

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
            <Grid item xs={12}>
              <Stack spacing={spacing}>
                <Divider>
                  <Typography>جستجو</Typography>
                </Divider>
                <SearchBox />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Divider>
                  <Typography>موضوعات</Typography>
                </Divider>
                <Categories />
              </Stack>
            </Grid>
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
