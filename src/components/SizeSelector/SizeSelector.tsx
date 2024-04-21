'use client';

import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslations } from 'next-intl';
import { useState, FC } from 'react';

export interface SizeSelectorProps {
  items: number[];
}
const SizeSelector: FC<SizeSelectorProps> = ({ items }) => {
  const [size, setSize] = useState('42');

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value);
  };

  const t = useTranslations();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 150,
      }}
    >
      <FormControl fullWidth size="small">
        <InputLabel id="size-select-label">{t('fields.size')}</InputLabel>
        <Select
          labelId="size-select-label"
          id="size-select"
          value={size}
          label={t('fields.size')}
          onChange={handleChange}
        >
          {items.map((size) => {
            return (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SizeSelector;
