import { DesktopView } from '@/components/ResponsiveDesign';
import { VariableProductItemSkeleton } from '@/components/VariableProductItem';
import { Box, Container, Grid, Skeleton, Stack } from '@mui/material';

const Loading = () => {
  return (
    <>
      <DesktopView>
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <Box
              sx={{
                minWidth: 270,
                width: 300,
                height: '50vh',
              }}
            >
              <Skeleton variant="rectangular" animation="wave" height="100%" />
            </Box>
            <Stack spacing={1} sx={{ flexGrow: 1, height: '50vh' }}>
              <Skeleton variant="rectangular" animation="wave" height={40} />

              <Grid container spacing={1}>
                {new Array(4).fill(1).map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
                      <VariableProductItemSkeleton />
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          </Box>
        </Container>
      </DesktopView>
    </>
  );
};

export default Loading;
