import { ButtonWithLoadingProps } from '@/components/common/ButtonWithLoading';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export interface IUseNewDialog {
  (): {
    open: boolean;
    handleOpenDialog: () => void;
    handleCloseDialog: () => void;
    returnButton: ButtonWithLoadingProps;
  };
}
const useNewDialog: IUseNewDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const t = useTranslations();

  const returnButton: ButtonWithLoadingProps = {
    children: t('buttons.return'),
    variant: 'outlined',
    color: 'inherit',
    onClick: handleCloseDialog,
    fullWidth: true,
    size: 'large',
  };

  return { open, handleOpenDialog, handleCloseDialog, returnButton };
};

export default useNewDialog;
