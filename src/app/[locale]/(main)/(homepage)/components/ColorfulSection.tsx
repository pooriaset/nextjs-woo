'use client';

import { Box, darken, styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const ColorfulSection = styled(Box)<{}>(({ theme }) => ({
  padding: theme.spacing(2, 0),
  backgroundColor:
    theme.palette.mode === 'light'
      ? blueGrey['50']
      : darken(blueGrey['900'], 0.5),
  width: '100%',
}));

export default ColorfulSection;
