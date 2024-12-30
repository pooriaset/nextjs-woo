import { VariableProductItemSkeleton } from '@/components/VariableProductItem';
import { Grid } from '@mui/material';

const DesktopFallback = () => {
  return (
    <Grid container spacing={1}>
      {new Array(4).fill(1).map((_, index) => {
        return (
          <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
            <VariableProductItemSkeleton />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DesktopFallback;
