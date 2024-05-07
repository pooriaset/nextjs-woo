import Logo from '@/components/common/Logo';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from '@mui/material';

const Loading = () => {
  return (
    <Dialog open={true} maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Logo />
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="indeterminate" />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
