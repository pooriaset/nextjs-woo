import { SortOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { options } from './static/options';

const SortRow = () => {
  const [selectedSort, setSelectedSort] = useState(0);
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
            key={option.label}
            size="small"
            sx={{
              color: (theme) =>
                index === selectedSort ? theme.palette.primary.main : grey[600],
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
