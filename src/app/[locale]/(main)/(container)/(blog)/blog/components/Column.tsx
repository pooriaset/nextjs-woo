'use client';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import SearchBox from './SearchBox';
import Categories from './Categories';

interface ColumnProps {
  spacing: number;
}
const Column: FC<ColumnProps> = ({ spacing }) => {
  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={spacing}>
          <Divider>
            <Typography>جستجو</Typography>
          </Divider>
          <SearchBox />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <Divider>
            <Typography>موضوعات</Typography>
          </Divider>
          <Categories />
        </Stack>
      </Grid>
    </>
  );
};

export default Column;
