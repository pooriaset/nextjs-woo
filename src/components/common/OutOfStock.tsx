import { Box, BoxProps } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export interface OutOfStockProps extends Partial<BoxProps> {}
const OutOfStock: FC<OutOfStockProps> = (props) => {
  const t = useTranslations();
  return (
    <Box
      {...props}
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 1,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'gray',
        userSelect: 'none',
        ...props.sx,
      }}
    >
      {t('products.outOfStock')}
    </Box>
  );
};

export default OutOfStock;
