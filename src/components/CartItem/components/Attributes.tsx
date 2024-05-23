import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import RulerIcon from '../../Icons/RulerIcon';

export interface AttributesProps {
  size: ReactNode | undefined;
}
const Attributes: FC<AttributesProps> = ({ size }) => {
  const t = useTranslations();
  return (
    <Stack gap={1} direction="row">
      <RulerIcon />
      <Typography>
        {/* TODO: Get variant title from backend! */}
        {t('fields.size')}
      </Typography>
      <Typography>{size}</Typography>
    </Stack>
  );
};

export default Attributes;
