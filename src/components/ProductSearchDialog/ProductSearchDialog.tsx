import Transition from '@/components/common/Transition';
import { Locale, languages } from '@/navigation';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogProps } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

const ProductSearchDialog: FC<DialogProps> = (props) => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen
      aria-labelledby="search-dialog"
      {...props}
    >
      <DialogContent
        sx={{
          pb: 9,
        }}
      >
        {props.children}
        <Box
          sx={{
            position: 'fixed',
            bottom: (theme) => theme.spacing(2.5),
            left: (theme) => theme.spacing(3),
            right: (theme) => theme.spacing(3),
          }}
        >
          <Button
            size="large"
            fullWidth
            variant="outlined"
            endIcon={
              languages[locale as Locale].direction === 'rtl' ? (
                <ChevronLeft />
              ) : (
                <ChevronRight />
              )
            }
            onClick={(event) => props?.onClose?.(event, 'escapeKeyDown')}
          >
            {t('buttons.return')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSearchDialog;
