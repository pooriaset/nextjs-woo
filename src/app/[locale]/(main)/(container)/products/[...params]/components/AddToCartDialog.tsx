import Dialog from '@/components/Dialog';
import RulerIcon from '@/components/Icons/RulerIcon';
import Image from '@/components/common/Image';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Variations } from '../../types/common';
import { useRouter } from '@/navigation';

export interface AddToCartDialogProps {
  open: boolean;
  onClose: () => void;
  data: NonNullable<Variations>['nodes'][number];
}
const AddToCartDialog: FC<AddToCartDialogProps> = ({ open, onClose, data }) => {
  const router = useRouter();
  const handleClickOnGoToCart = (): void => {
    router.push('/cart');
  };

  const t = useTranslations();
  return (
    <Dialog
      title={t('pages.cart.addToCartDialog.title')}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 500,
        },
      }}
      buttons={[
        {
          id: 'go-to-cart',
          onClick: handleClickOnGoToCart,
          color: 'primary',
          variant: 'contained',
          children: t('pages.cart.addToCartDialog.buttonTitle'),
          fullWidth: true,
          size: 'large',
        },
        {
          id: 'resume-buying',
          onClick: onClose,
          color: 'inherit',
          variant: 'outlined',
          children: t('pages.cart.addToCartDialog.resume'),
          fullWidth: true,
          size: 'large',
        },
      ]}
      dialogContentProps={{
        dividers: true,
      }}
    >
      <Stack gap={2} direction="row">
        <Image
          width={80}
          height={80}
          src={data?.image?.sourceUrl}
          alt="Image"
        />
        <Box flexGrow={1}>
          <Stack gap={2}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {data?.name}
            </Typography>
            <Stack gap={1} direction="row">
              <RulerIcon />
              <Typography>
                {/* TODO: Get variant title from backend! */}
                {t('fields.size')}
              </Typography>
              <Typography>
                {data?.attributes?.nodes?.[0]?.value?.toUpperCase()}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddToCartDialog;
