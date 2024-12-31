import { RulerIcon } from '@/components/Icons';
import { ProductVariationContentSliceFragment } from '@/graphql/types/graphql';
import { PaletteOutlined, ShoppingBasketOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { IAttribute } from '../components/Attributes';

const useAttributes = ({
  attributes,
  quantity,
}: {
  attributes: ProductVariationContentSliceFragment['attributes'];
  quantity?: number | null | string | undefined;
}) => {
  const t = useTranslations();

  const icons: Record<string, { icon: ReactNode; title: string }> = {
    pa_color: {
      title: t('fields.color'),
      icon: <PaletteOutlined fontSize="small" />,
    },
    pa_sizes: {
      title: t('fields.size'),
      icon: <RulerIcon />,
    },
  };

  const _attributes =
    attributes?.nodes.map((attribute) => {
      return {
        ...icons[attribute.name!],
        ...(attribute.name === 'pa_color'
          ? {
              value: (
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: 1,
                    backgroundColor: `#${attribute.value}`,
                  }}
                />
              ),
            }
          : attribute.name === 'pa_sizes'
          ? { value: attribute.value?.toUpperCase() }
          : { value: '-' }),
      } as IAttribute;
    }) || [];

  if (quantity) {
    _attributes.unshift({
      title: t('fields.count'),
      value: quantity || 1,
      icon: <ShoppingBasketOutlined fontSize="small" />,
    });
  }

  return _attributes;
};

export default useAttributes;
