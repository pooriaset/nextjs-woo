import { VariableProductItemSkeleton } from '@/components/VariableProductItem';
import { Grid } from '@mui/material';
import React from 'react';

const loading = () => {
  return (
    <Grid container spacing={2}>
      {new Array(6).fill(1).map((_item, index) => {
        return (
          <Grid key={index} item xs={12} md={6} lg={3} xl={2}>
            <VariableProductItemSkeleton />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default loading;
