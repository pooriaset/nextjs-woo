'use client';

import { ProductVariationContentSliceFragment } from '@/graphql/types/graphql';
import useProductPageParams from '@/hooks/useProductPageParams';
import { ProductPageEnum } from '@/utils/params';
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useEffect } from 'react';
import { Variations } from '../../types/common';

export interface VariantSelectorProps {
  variations: Variations;
}

const VariantSelector: FC<VariantSelectorProps> = ({ variations }) => {
  const t = useTranslations();

  const params = useProductPageParams();

  const variants = variations?.nodes as ProductVariationContentSliceFragment[];

  const colors = new Set();
  variants.forEach((variant) => {
    variant.attributes?.nodes.forEach((attr: any) => {
      if (attr.name === 'pa_color') {
        colors.add(attr.value);
      }
    });
  });

  useEffect(() => {
    if (!params.color && colors.size) {
      const first = colors.values().next();
      params.navigate({ [ProductPageEnum.Color]: first.value });
    }
  }, [params.color, colors.size]);

  const sizes = new Set();
  variants.forEach((variant) => {
    const hasColor = variant.attributes?.nodes.some((attr) => {
      return attr.value === params.color;
    });

    if (hasColor) {
      const attr = variant.attributes?.nodes.find(
        (item) => item.name === 'pa_sizes',
      )!;

      sizes.add(attr.value);
    }
  });

  const getVariantId = (args: {
    color: string | null;
    size: string | null;
  }) => {
    const variant = variants.find((variant) => {
      const hasColor = variant.attributes?.nodes.some(
        (item) => item.value === args.color,
      );
      const hasSize = variant.attributes?.nodes.some(
        (item) => item.value === args.size,
      );

      return hasColor && hasSize;
    });

    return variant?.databaseId || null;
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="body2">{t('fields.color')}</Typography>
        <RadioGroup
          value={params.color}
          onChange={(_, value) => {
            params.navigate({
              [ProductPageEnum.Size]: null,
              [ProductPageEnum.Color]: value,
              variantId: getVariantId({ size: null, color: value }),
            });
          }}
        >
          <Stack flexWrap="wrap" direction="row" spacing={1.5}>
            {Array.from(colors).map((item: any) => {
              const selected = item === params.color;
              return (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio sx={{ display: 'none' }} />}
                  label={
                    <Box
                      sx={{
                        padding: 0.5,
                        transition: 'all 200ms ease',
                        userSelect: 'none',
                        border: '2px solid',
                        borderColor: selected ? 'primary.main' : 'transparent',
                        borderRadius: 1,
                      }}
                    >
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                      >
                        <Box
                          sx={{
                            borderRadius: 1,
                            width: 30,
                            height: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 200ms ease',
                            userSelect: 'none',
                            backgroundColor: `#${item}`,
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        ></Box>
                      </Stack>
                    </Box>
                  }
                />
              );
            })}
          </Stack>
        </RadioGroup>
      </Stack>

      <Divider sx={{ flexGrow: 1, width: '100%' }} />

      <Stack spacing={1}>
        <Typography variant="body2">{t('fields.size')}</Typography>
        <RadioGroup
          value={params.size}
          onChange={(e) => {
            params.navigate({
              [ProductPageEnum.Size]: e.target.value,
              variantId: getVariantId({
                size: e.target.value,
                color: params.color,
              }),
            });
          }}
        >
          <Stack flexWrap="wrap" direction="row" spacing={1.5}>
            {Array.from(sizes).map((item: any) => {
              const selected = item === params.size;
              return (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio sx={{ display: 'none' }} />}
                  label={
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        border: '2px solid',
                        borderColor: selected ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 200ms ease',
                        userSelect: 'none',
                      }}
                    >
                      {item}
                    </Box>
                  }
                />
              );
            })}
          </Stack>
        </RadioGroup>
      </Stack>
    </Stack>
  );
};

export default VariantSelector;
