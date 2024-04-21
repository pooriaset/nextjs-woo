'use client';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Link as NextLink } from '@/navigation';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: (theme) => theme.palette.primary.main,
          mt: 5,
          fontWeight: 'bold',
        }}
      >
        404
      </Typography>
      <Typography variant="h6">به نظر آدرس را اشتباه وارد کرده‌اید.</Typography>

      <Button
        variant="outlined"
        endIcon={<ChevronLeft />}
        component={NextLink}
        href="/"
      >
        صفحهٔ اول
      </Button>
    </Box>
  );
};

export default NotFound;
