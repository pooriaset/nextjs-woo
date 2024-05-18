import Image from '@/components/common/Image';
import { Box } from '@mui/material';
import React, { FC } from 'react';

export interface GalleryItemProps {
  onClick: () => void;
  alt: string | undefined | null;
  src: string | undefined | null;
  isActive?: boolean;
  width: number;
  height: number;
}
const GalleryItem: FC<GalleryItemProps> = ({
  onClick,
  alt,
  src,
  width,
  height,
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
        width: width,
        height: height,
        position: 'relative',
      }}
    >
      <Image
        onClick={onClick}
        draggable={false}
        width={width}
        height={height}
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
