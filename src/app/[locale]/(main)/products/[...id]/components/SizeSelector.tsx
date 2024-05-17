'use client';

import { VariantSelector } from '@/components/VariantSelector';
import { VariantSelectorProps } from '@/components/VariantSelector/VariantSelector';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { Variations } from '../../types/common';
import { useProductContext } from '../hooks/useProductContext';

export interface SizeSelectorProps {
  variations: Variations;
}

const SizeSelector: FC<SizeSelectorProps> = ({ variations }) => {
  const t = useTranslations();

  const _items = useMemo(() => {
    const _items: VariantSelectorProps['items'] = [];

    variations?.nodes.forEach((variant) => {
      variant.attributes?.nodes.forEach((attribute) => {
        _items.push({
          id: variant.id!,
          name: attribute.value!,
          value: variant.id,
        });
      });
    });

    return _items;
  }, []);

  const { selectedVariantId, handleChangeSelectedVariantId } =
    useProductContext();

  return (
    <VariantSelector
      items={_items}
      label={t('fields.size')}
      value={selectedVariantId}
      onChange={handleChangeSelectedVariantId}
    />
  );
};

export default SizeSelector;
