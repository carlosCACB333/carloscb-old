import { Grid } from '@mui/material';
import React from 'react';
import { Loader } from './Loader';

export const LoaderGrid = ({ count = 8 }) => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
          <Loader />
        </Grid>
      ))}
    </Grid>
  );
};
