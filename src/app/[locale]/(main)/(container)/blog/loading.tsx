import { Divider, Grid, Skeleton, Stack } from '@mui/material';
import FiltersSkeleton from './components/FiltersSkeleton';

const spacing = 2;

const Loading = () => {
  return (
    <Stack gap={spacing}>
      <Grid container spacing={spacing}>
        <Grid item container xs={12} spacing={spacing} alignItems="flex-start">
          <Grid item container lg={3} md={12} xs={12} spacing={spacing}>
            <FiltersSkeleton spacing={spacing} />
          </Grid>
          <Grid item container lg={9} md={12} xs={12} spacing={spacing}>
            <Grid item xs={12}>
              <Divider>
                <Skeleton variant="text" width={90} />
              </Divider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Loading;
