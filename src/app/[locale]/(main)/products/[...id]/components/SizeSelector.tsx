'use client';

import { VariantSelector } from '@/components/VariantSelector';
import { VariantSelectorProps } from '@/components/VariantSelector/VariantSelector';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { Product } from '../../types/common';

export interface SizeSelectorProps {
  items: Extract<Product, { __typename?: 'VariableProduct' }>['variations'];
}

const SizeSelector: FC<SizeSelectorProps> = ({ items }) => {
  const t = useTranslations();

  const _items = useMemo(() => {
    const _items: VariantSelectorProps['items'] = [];

    items?.nodes.forEach((item) => {
      item.attributes?.nodes.forEach((item) => {
        _items.push({
          id: item.value!,
          name: item.value!,
          value: item.value,
        });
      });
    });

    return _items;
  }, []);

  return <VariantSelector items={_items} label={t('fields.size')} />;
};

export default SizeSelector;
