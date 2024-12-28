import CartItem from '@/components/CartItem/CartItem';
import Dialog from '@/components/Dialog/Dialog';
import { ProductVariationContentSliceFragment } from '@/graphql/types/graphql';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FC, useTransition } from 'react';

export interface AddToCartDialogProps {
  open: boolean;
  onClose: () => void;
  value: ProductVariationContentSliceFragment;
}
const AddToCartDialog: FC<AddToCartDialogProps> = ({
  open,
  onClose,
  value,
}) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const handleClickOnGoToCart = (): void => {
    startTransition(() => {
      router.push('/cart');
    });
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
          isLoading: isPending,
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
          disabled: isPending,
        },
      ]}
      dialogContentProps={{
        dividers: true,
      }}
    >
      <CartItem value={value} />
    </Dialog>
  );
};

export default AddToCartDialog;
