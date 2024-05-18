import Image from '@/components/common/Image';
import { Box } from '@mui/material';
import React, { FC } from 'react';

export interface GalleryItemProps {
  onClick: () => void;
  alt: string | undefined | null;
  src: string | undefined | null;
  isActive?: boolean;
}
const GalleryItem: FC<GalleryItemProps> = ({
  onClick,
  alt,
  src,
  isActive = false,
}) => {
  return (
    <Box
      sx={{
        p: 0.5,
        border: '1px solid',
        borderColor: isActive
          ? (theme) => theme.palette.primary.main
          : 'divider',
        transition: 'all 200ms ease',
        borderRadius: 1,
        width: 72,
        height: 72,
        position: 'relative',
      }}
    >
      <Image
        onClick={onClick}
        draggable={false}
        width={72}
        height={72}
        alt={alt}
        src={src}
        style={{
          objectFit: 'contain',
          cursor: 'pointer',
          userSelect: 'none',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </Box>
  );
};

export default GalleryItem;
