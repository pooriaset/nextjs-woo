'use client';

import { VariantSelector } from '@/components/VariantSelector';
import { VariantSelectorProps } from '@/components/VariantSelector/VariantSelector';
import { GetSingleProductQuery } from '@/graphql/types/graphql';
import { useTranslations } from 'next-intl';
import React, { FC, useMemo } from 'react';

export interface SizeSelectorProps {
  items: Extract<
    NonNullable<GetSingleProductQuery['product']>,
    { __typename?: 'VariableProduct' }
  >['variations'];
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
