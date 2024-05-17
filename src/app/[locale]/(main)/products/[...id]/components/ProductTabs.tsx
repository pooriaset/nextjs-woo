'use client';

import KeyValueViewer from '@/components/KeyValueViewer/KeyValueViewer';
import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, SyntheticEvent, useState } from 'react';
import Section from './Section';

export interface ProductTabsProps {
  content?: string | null;
}

const offset = 118 + 60 + 48;

const CustomDivider = <Divider sx={{ borderWidth: 2, borderRadius: 1 }} />;
const ProductTabs: FC<ProductTabsProps> = ({ content }) => {
  const t = useTranslations();

  const [id, setId] = useState('introduction');

  const handleChangeIntersection = (
    inView: boolean,
    entry: IntersectionObserverEntry,
  ) => {
    if (inView) {
      setId(entry.target.id);
    }
  };

  const handleChangeTab = (event: SyntheticEvent, value: string) => {
    const item = document.getElementById(value)!;
    const count = item.offsetTop - document.body.offsetTop - offset;

    window.scrollTo({
      top: count,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 118 + 60,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: (theme) => theme.palette.background.default,
          zIndex: 1000,
        }}
      >
        <Tabs
          value={id}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          onChange={handleChangeTab}
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
        id="wrapper"
        container
        spacing={3}
        sx={{
          mt: 2,
        }}
      >
        <Grid item xs={12}>
          <Section
            onChangeIntersection={handleChangeIntersection}
            id="introduction"
            label={t('pages.product.tabs.introduction')}
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
            onChangeIntersection={handleChangeIntersection}
            id="specifications"
            label={t('pages.product.tabs.specifications')}
          >
            <KeyValueViewer
              items={[
                {
                  key: 'کد محصول',
                  value: 'A025',
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
            onChangeIntersection={handleChangeIntersection}
            id="comments"
            label={t('pages.product.tabs.comments')}
          ></Section>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductTabs;
