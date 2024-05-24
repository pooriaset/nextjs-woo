import { Close } from '@mui/icons-material';
import { Box, DialogActions, IconButton } from '@mui/material';
import MuiDialog, {
  type DialogProps as MuiDialogProps,
} from '@mui/material/Dialog';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';
import ButtonWithLoading, {
  type ButtonWithLoadingProps,
} from '../common/ButtonWithLoading';
import DialogTransition from '../common/DialogTransition';
import { useAppContext } from '@/hooks/useAppContext';

export interface DialogProps extends MuiDialogProps {
  dialogContentProps?: DialogContentProps;
  buttons?: ButtonWithLoadingProps[];
  closeButtonDisabled?: boolean;
}

const Dialog: FC<DialogProps> = ({
  title,
  buttons = [],
  closeButtonDisabled = false,
  ...props
}) => {
  const { isMobile } = useAppContext();
  return (
    <MuiDialog
      TransitionComponent={DialogTransition}
      {...props}
      PaperProps={{
        ...props.PaperProps,
        sx: {
          ...props?.PaperProps?.sx,
          ...(isMobile
            ? {
                margin: 0,
                width: '100%',
                maxWidth: '100%',
              }
            : {}),
        },
      }}
      slotProps={{
        root: isMobile
          ? {
              style: {
                zIndex: 2000,
              },
            }
          : {},
      }}
      sx={{
        ...props.sx,
        ...(isMobile
          ? {
              '& .MuiDialog-container': {
                alignItems: 'flex-end',
              },
            }
          : {}),
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {title}
        {!closeButtonDisabled && (
          <IconButton
            aria-label="close-dialog"
            onClick={() => {
              props.onClose?.({}, 'escapeKeyDown');
            }}
          >
            <Close />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent {...props.dialogContentProps}>
        <Box mt={1}>{props.children}</Box>
      </DialogContent>
      {buttons?.length > 0 && (
        <DialogActions>
          {buttons.map((button, index) => {
            return <ButtonWithLoading key={index} {...button} />;
          })}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
