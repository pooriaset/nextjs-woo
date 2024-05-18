'use client';

import Image from '@/components/common/Image';
import { FullscreenOutlined } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Product } from '../../types/common';
import ProductGalleryDialog from './ProductGalleryDialog';

export type ProductImages = Extract<
  Product['galleryImages'],
  { __typename?: 'ProductToMediaItemConnection' }
>['nodes'];

export interface ProductGalleryProps {
  value?: ProductImages;
}
const ProductGallery: FC<ProductGalleryProps> = ({ value = [] }) => {
  const t = useTranslations();

  const [openDialog, setOpenDialog] = useState(false);

  if (!value.length) {
    return null;
  }

  const handleClickOnImage = () => {
    setOpenDialog(true);
  };
  const handleClickOnClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ProductGalleryDialog
        value={value}
        open={openDialog}
        onClose={handleClickOnClose}
      />
      <Box
        sx={{
          maxWidth: '100%',
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          overflow: 'hidden',
          height: 72,
        }}
      >
        {value?.map((item, index) => {
          const isLast = value.length - 1 == index;
          return (
            <Tooltip
              title={isLast ? t('pages.product.tooltips.fullScreen') : null}
              key={item.id}
            >
              <Box
                sx={{
                  p: 0.5,
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.divider,
                  borderRadius: 1,
                  width: 72,
                  height: 72,
                  position: 'relative',
                }}
              >
                <Image
                  onClick={handleClickOnImage}
                  draggable={false}
                  width={72}
                  height={72}
                  alt={item.altText}
                  src={item.sourceUrl}
                  style={{
                    objectFit: 'contain',
                    cursor: 'pointer',
                    userSelect: 'none',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    ...(isLast
                      ? {
                          filter: 'blur(4px)',
                          opacity: 0.5,
                        }
                      : {}),
                  }}
                />
                {isLast && (
                  <FullscreenOutlined
                    fontSize="large"
                    color="disabled"
                    sx={{
                      pointerEvents: 'none',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                    }}
                  />
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </>
  );
};

export default ProductGallery;
