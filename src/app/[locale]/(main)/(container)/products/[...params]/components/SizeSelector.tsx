'use client';

import { VariantSelector } from '@/components/VariantSelector';
import { VariantSelectorProps } from '@/components/VariantSelector/VariantSelector';
import { getFragmentData } from '@/graphql/types';
import { ProductVariationContentSliceFragmentDoc } from '@/graphql/types/graphql';
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
      const _variant = getFragmentData(
        ProductVariationContentSliceFragmentDoc,
        variant,
      );

      _variant.attributes?.nodes.forEach((attribute) => {
        _items.push({
          id: _variant.id!,
          name: attribute.value!,
          value: _variant.databaseId,
        });
      });
    });

    return _items;
  }, [variations?.nodes]);

  const { selectedVariantId, handleChangeSelectedVariantId } =
    useProductContext();

  return (
    <VariantSelector
      items={_items}
      // TODO: Get variant title from backend!
      label={t('fields.size')}
      value={selectedVariantId}
      onChange={handleChangeSelectedVariantId}
    />
  );
};

export default SizeSelector;
