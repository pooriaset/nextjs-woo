'use client';

import Logo from '@/components/common/Logo';
import ProgressBar from '@/components/common/ProgressBar';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from '@mui/material';

const LoadingComponent = () => {
  return (
    <>
      <ProgressBar />
      <Dialog open maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Logo />
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="indeterminate" />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoadingComponent;
