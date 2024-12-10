import { CircularProgress, Stack } from '@mui/material';

const loading = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100%"
      flexGrow={1}
    >
      <CircularProgress size={24} />
    </Stack>
  );
};

export default loading;
