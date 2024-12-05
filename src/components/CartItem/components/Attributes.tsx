import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import RulerIcon from '../../Icons/components/Use/RulerIcon';

export interface AttributesProps {
  size: ReactNode | undefined;
}
const Attributes: FC<AttributesProps> = ({ size }) => {
  const t = useTranslations();
  return (
    <Stack gap={1} direction="row">
      <RulerIcon />
      <Typography variant="subtitle2">
        {/* TODO: Get variant title from backend! */}
        {t('fields.size')}
      </Typography>
      <Typography variant="subtitle2">{size}</Typography>
    </Stack>
  );
};

export default Attributes;
