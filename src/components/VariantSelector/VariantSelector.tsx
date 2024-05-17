'use client';

import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC, useState } from 'react';

export interface VariantSelectorProps {
  items: { id: number | string; value: any; name: string }[];
  label: string;
}
const VariantSelector: FC<VariantSelectorProps> = ({ items, label }) => {
  const [size, setSize] = useState('42');

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value);
  };

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
        <InputLabel id="size-select-label">{label}</InputLabel>
        <Select
          labelId="size-select-label"
          id="size-select"
          value={size}
          label={label}
          onChange={handleChange}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VariantSelector;
