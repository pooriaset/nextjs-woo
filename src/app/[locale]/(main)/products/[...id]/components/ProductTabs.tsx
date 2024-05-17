'use client';

import KeyValueViewer from '@/components/KeyValueViewer/KeyValueViewer';
import TabPanel from '@/components/common/TabPanel';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, SyntheticEvent, useState } from 'react';
import { Product } from '../../types/common';
import Section from './Section';

export interface ProductTabsProps {
  content?: string | null;
  attributes?: NonNullable<Product['customAttributes']>['nodes'];
}

const ProductTabs: FC<ProductTabsProps> = ({ content, attributes }) => {
  const t = useTranslations();

  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, value: string) => {
    setActiveTab(+value);
  };

  const items =
    attributes
      ?.filter((item) => !item.variation)
      .map((item) => {
        const value = item.optionNames?.join(`${t('stringSeparator')} `) ?? '';
        return {
          key: item.label ?? '',
          value,
        };
      }) ?? [];

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
          value={activeTab}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          onChange={handleChangeTab}
        >
          <Tab value={0} label={t('pages.product.tabs.introduction')} />
          <Tab value={1} label={t('pages.product.tabs.specifications')} />
          <Tab value={2} label={t('pages.product.tabs.comments')} />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <Section label={t('pages.product.tabs.introduction')}>
          <Typography
            component="div"
            sx={{
              lineHeight: 2,
            }}
            dangerouslySetInnerHTML={{ __html: content! }}
          />
        </Section>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Section label={t('pages.product.tabs.specifications')}>
          <KeyValueViewer items={items} />
        </Section>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Section label={t('pages.product.tabs.comments')}></Section>
      </TabPanel>
    </>
  );
};

export default ProductTabs;
