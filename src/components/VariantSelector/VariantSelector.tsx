'use client';

import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC } from 'react';

export interface VariantSelectorProps {
  items: { id: number | string; value: any; name: string }[];
  label: string;
  value: any;
  onChange: (value: any) => void;
}
const VariantSelector: FC<VariantSelectorProps> = ({
  items,
  label,
  value,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
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
        <InputLabel id="variant-select-label">{label}</InputLabel>
        <Select
          labelId="variant-select-label"
          id="variant-select"
          value={value}
          label={label}
          onChange={handleChange}
          MenuProps={{
            disableScrollLock: true,
            sx: {
              zIndex: (theme) => theme.zIndex.appBar + 1,
            },
          }}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.id} value={item.value}>
                {item.name.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VariantSelector;
