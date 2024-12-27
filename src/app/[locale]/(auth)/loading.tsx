import {
  Box,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Stack,
} from '@mui/material';

const Loading = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Stack spacing={3} justifyContent="center" alignItems="center">
            <Box
              sx={{
                pt: 2,
              }}
            >
              <Skeleton width={120} height={35} />
            </Box>
          </Stack>
          <Stack spacing={2}>
            <Skeleton height={50} />
            <Skeleton height={50} />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Skeleton width="100%" height={65} />
      </CardActions>
    </Card>
  );
};

export default Loading;
