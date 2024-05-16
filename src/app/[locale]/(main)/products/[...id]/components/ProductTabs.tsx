'use client';

import KeyValueViewer from '@/components/KeyValueViewer/KeyValueViewer';
import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import Section from './Section';

export interface ProductTabsProps {
  content?: string | null;
}

const CustomDivider = <Divider sx={{ borderWidth: 2, borderRadius: 1 }} />;
const ProductTabs: FC<ProductTabsProps> = ({ content }) => {
  const t = useTranslations();

  const [id, setId] = useState('introduction');

  const handleChangeIntersection = (id: string) => {
    setId(id);
  };

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 116 + 60,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Tabs
          value={id}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          onChange={(event, value) => {
            document
              .getElementById(value)
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Tab
            value="introduction"
            label={t('pages.product.tabs.introduction')}
          />
          <Tab
            value="specifications"
            label={t('pages.product.tabs.specifications')}
          />
          <Tab value="comments" label={t('pages.product.tabs.comments')} />
        </Tabs>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          mt: 2,
        }}
      >
        <Grid item xs={12}>
          <Section
            id="introduction"
            label={t('pages.product.tabs.introduction')}
            onChange={handleChangeIntersection}
          >
            <Typography
              component="div"
              sx={{
                lineHeight: 2,
              }}
              dangerouslySetInnerHTML={{ __html: content! }}
            />
          </Section>
        </Grid>

        <Grid item xs={12}>
          {CustomDivider}
        </Grid>

        <Grid item xs={12}>
          <Section
            id="specifications"
            label={t('pages.product.tabs.specifications')}
            onChange={handleChangeIntersection}
          >
            <KeyValueViewer
              items={[
                {
                  key: 'test',
                  value: 'test',
                },
                {
                  key: 'test',
                  value: 'test',
                },
                {
                  key: 'test',
                  value: 'test',
                },
                {
                  key: 'test',
                  value: 'test',
                },
              ]}
            />
          </Section>
        </Grid>

        <Grid item xs={12}>
          {CustomDivider}
        </Grid>

        <Grid item xs={12}>
          <Section
            id="comments"
            label={t('pages.product.tabs.comments')}
            onChange={handleChangeIntersection}
          ></Section>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductTabs;
