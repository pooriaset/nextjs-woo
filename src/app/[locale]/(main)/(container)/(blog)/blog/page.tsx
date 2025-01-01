'use client';

import {
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  TabsProps,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from '@mui/material';
import { Section } from './components/Section';
import TabPanel from '@/components/common/TabPanel';
import { useState } from 'react';

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
        <Grid item container xs={12} spacing={spacing}>
          <Grid item lg={3} md={12} xs={12}>
            <Card variant="outlined">
              <CardHeader
                titleTypographyProps={{
                  variant: 'h6',
                }}
                title="دسته‌بندی‌ها"
              />
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item lg={9} md={12} xs={12}>
            <Divider>
              <Typography>آخرین مقالات</Typography>
            </Divider>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Page;
