import Image from '@/components/common/Image';
import { FC } from 'react';
import { Product } from '../../types/common';

export interface ProductImageProps {
  value?: Product['image'];
}
const ProductImage: FC<ProductImageProps> = ({ value }) => {
  return (
    <Image
      width={500}
      height={500}
      src={value?.sourceUrl}
      alt={value?.altText}
      draggable={false}
      style={{
        userSelect: 'none',
        width: '100%',
        borderRadius: 8,
      }}
    />
  );
};

export default ProductImage;
