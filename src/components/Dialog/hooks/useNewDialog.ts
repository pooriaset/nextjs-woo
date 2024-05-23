import { useState } from 'react';

export interface IUseNewDialog {
  (): {
    open: boolean;
    handleOpenDialog: () => void;
    handleCloseDialog: () => void;
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
  return { open, handleOpenDialog, handleCloseDialog };
};

export default useNewDialog;
