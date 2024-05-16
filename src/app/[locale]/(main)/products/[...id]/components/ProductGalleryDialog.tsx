import Dialog, { DialogProps } from '@/components/Dialog';
import Image from '@/components/common/Image';
import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductImages } from './ProductGallery';

export interface ProductGalleryDialogProps extends DialogProps {
  value: ProductImages;
}
const ProductGalleryDialog: FC<ProductGalleryDialogProps> = ({
  value,
  ...props
}) => {
  const t = useTranslations();
  const theme = useTheme();
  return (
    <Dialog
      maxWidth={'lg'}
      title={t('pages.product.galleryDialogTitle')}
      {...props}
    >
      <Swiper
        dir={theme.direction}
        autoplay={{
          delay: 3000,
          stopOnLastSlide: false,
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        style={{
          borderRadius: 16,
        }}
      >
        {value?.map((item) => {
          return (
            <SwiperSlide
              key={item.altText}
              style={{
                height: 'auto',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <Image
                priority
                width={600}
                height={600}
                src={item.sourceUrl}
                alt={item.altText}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Dialog>
  );
};

export default ProductGalleryDialog;
