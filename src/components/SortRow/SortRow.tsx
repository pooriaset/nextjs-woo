'use client';

import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import { SortOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { MouseEventHandler } from 'react';
import { options } from './static/options';

const SortRow = () => {
  const { sort, navigate } = useCustomSearchParams();

  const handleClickOnItem = (value: string | number) => {
    const func: MouseEventHandler<HTMLButtonElement> = (event) => {
      navigate('Sort', value);
    };
    return func;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        pb: 0.5,
      }}
    >
      <SortOutlined />
      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
        }}
      >
        مرتب سازی:
      </Typography>
      {options.map((option, index) => {
        return (
          <Button
            onClick={handleClickOnItem(option.key)}
            key={option.label}
            size="small"
            sx={{
              color: (theme) =>
                option.key === sort ? theme.palette.primary.main : grey[600],
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </Box>
  );
};

export default SortRow;
